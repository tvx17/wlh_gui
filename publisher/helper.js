const logger = require('./logger.js');
const config = require('./config.js');
const fs = require('fs');
const path = require('path');

const writeJson = (path, data) => {
  path =buildPath(path);
  fs.writeFileSync(
    path,
    JSON.stringify(data, null, 2)
  );
}

const copy = (source, target) =>{
  source = buildPath(source);
  target = buildPath(target);
  fs.copyFileSync(
    path.join(source),
    path.join(target)
  );
}

const buildPath = (parts) =>{
  let _path = process.cwd();
  for(const part of parts) {
    _path = path.join(_path, part)
  }
  return _path;
}

const getLastReleaseVersion = (split = true) => {
  const jsonData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), config.releasesPath, config.releasesFile),
      'utf8'
    )
  );

  return split ? jsonData[0].split('.') : jsonData[0];
};

const getReleaseNotes = () => {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'releaseNotes.json'), 'utf8')
  );
};

const getReleases = () => {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), config.releasesPath, config.releasesFile),
      'utf8'
    )
  );
};
const setReleases = (releaseData) => {
  fs.writeFileSync(
    path.join(process.cwd(), config.releasesPath, config.releasesFile),
    JSON.stringify(releaseData, null, 2)
  );
};

const getGithubToken = () => {
  return JSON.parse(
    fs.readFileSync(
      'C:\\Users\\ckoeste1\\OneDrive - Axel Springer SE\\.gh',
      'utf8'
    )
  );
};

const getGitHubRepoUrl = () => {
  return `https://github.com/${config.githubUser}/${config.githubRepo}`;
};

const getFormatedDate = (withTime = false) => {
  let formatedDate = '';
  const now = new Date();
  const day =
    now.getDate().toString().length === 1 ? '0' + now.getDate() : now.getDate();
  const month =
    (now.getMonth() + 1).toString().length === 1
      ? '0' + (now.getMonth() + 1)
      : now.getMonth() + 1;
  const year = now.getFullYear();
  formatedDate = `${year}-${month}-${day}`;
  if (withTime) {
    const hours =
      now.getHours().toString().length === 1
        ? '0' + now.getHours()
        : now.getHours();
    const minutes =
      now.getMinutes().toString().length === 1
        ? '0' + now.getMinutes()
        : now.getMinutes();
    const seconds =
      now.getSeconds().toString().length === 1
        ? '0' + now.getSeconds()
        : now.getSeconds();
    formatedDate += ` ${hours}:${minutes}:${seconds} (TZ: ${Intl.DateTimeFormat().resolvedOptions().timeZone
      })`;
  }
  return formatedDate;
};

const getInput = (message) => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let response = '';
  readline.question(message + ':', (res) => {
    response = res;
    readline.close();
  });
  return response;
};

const checkArgs = (args) => {
  if (args.length === 2) {
    logger.message("You haven't passed any parameters.");
    logger.help();
  }
};

module.exports = {
  getFormatedDate,
  getInput,
  checkArgs,
  getLastReleaseVersion,
  getReleaseNotes,
  getGithubToken,
  getGitHubRepoUrl,
  getReleases,
  setReleases,
  buildPath,
  copy, writeJson
};
