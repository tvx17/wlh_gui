const path = require('path');
const fs = require('fs');
const gitClient = require('isomorphic-git');
const gitHttpClient = require('isomorphic-git/http/node');
const gitProcessDir = path.join(process.cwd());
const logger = require('./logger');
const helper = require('./helper');
const config = require('./config');

const git =  async() => {
    logger.newSection('Processing git');
    const release = helper.getLastReleaseVersion(false);
    const token = helper.getGithubToken();

    const commitMessage = `Automated commit for release ${release}`;

    let branch = await gitClient.currentBranch({
      fs,
      dir: gitProcessDir,
      fullname: false,
    });
    logger.message('Branch: ' + branch);
    await gitClient.branch({
      fs,
      dir: gitProcessDir,
      ref: release,
      checkout: true,
      force: true,
    });
    await gitClient.add({ fs, dir: gitProcessDir, filepath: '.' });
    await gitClient.commit({
      fs,
      dir: gitProcessDir,
      author: { name: config.githubUser },
      message: commitMessage,
    });
    let pushResult = await gitClient.push({
      fs,
      http: gitHttpClient,
      dir: gitProcessDir,
      url: helper.getGitHubRepoUrl(),
      remoteRef: release,
      ref: release,
      onAuth: () => ({ username: token.token }),
    });
};

module.exports = git;
