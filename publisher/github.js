const { Octokit } = require('@octokit/rest');
const helper = require('./helper');
const config = require('./config');
const releaseNotes = require('./releaseNotes');
const dayjs = require('dayjs');

const main = async () => {
  await checkForCurrentRelease();
  await deleteAssets()
  setDefaultBranch()
  await setReleaseNotes();
};

const checkForCurrentRelease = async () => {
  const githubRef = connect();
  const releaseData = await githubRef.rest.repos.getLatestRelease({
                                                                    owner: config.githubUser,
                                                                    repo: config.githubRepo
                                                                  });

  const diff = dayjs().diff(dayjs(releaseData['data']['published_at']),'minute');
  if(diff > 10){
    console.log('The last release on GitHub is older than 10 minutes. That is a little bit to old and it cannot be part of the current building process!');
    console.log('Stopping further processing!');
    process.exit(0);
  }
};

const connect = () => {
  const token = helper.getGithubToken();
  return new Octokit({
                       auth: token.token,
                       userAgent: 'tvx17 v1.2.3'
                     });
};

const setReleaseNotes = async () => {
  const githubRef = connect();
  const releaseData = await githubRef.rest.repos.getLatestRelease({
                                                                    owner: config.githubUser,
                                                                    repo: config.githubRepo
                                                                  });
  await githubRef.rest.repos.updateRelease({
                                             owner: config.githubUser,
                                             repo: config.githubRepo,
                                             release_id: releaseData['data']['id'],
                                             body: releaseNotes.build()
                                           });
};

const setDefaultBranch = (branch) => {
  const githubRef = connect();
  githubRef.rest.repos.update({
                                owner: config.githubUser,
                                repo: config.githubRepo,
                                default_branch: branch
                              });
};

const deleteAssets = async () => {
  const octokit = connect();
  const release = await octokit.rest.repos.getLatestRelease({
                                                              owner: config.githubUser,
                                                              repo: config.githubRepo
                                                            });

  const assets = await octokit.rest.repos.listReleaseAssets({
                                                              owner: config.githubUser,
                                                              repo: config.githubRepo,
                                                              release_id: release['data']['id']
                                                            });

  const assetIds = [];

  for (const asset of assets['data']) {
    if (
      asset['name'].indexOf('latest') !== -1 ||
      asset['name'].indexOf('blockmap') !== -1
    ) {
      assetIds.push(asset['id']);
    }
  }

  for (const idToDelete of assetIds) {
    const result = await octokit.rest.repos.deleteReleaseAsset({
                                                                 owner: config.githubUser,
                                                                 repo: config.githubRepo,
                                                                 asset_id: idToDelete
                                                               });
  }
};

module.exports = { main };
