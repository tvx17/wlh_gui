const fs = require('fs');
const path = require('path');
const helper = require('../helper.js');
const config = require('../config.js');
const logger = require('../logger');

const buildNewVersionNumber = (releaseType) => {
  if (releaseType.indexOf('.') >= 0) {
    const versionTest = releaseType.split('.');
    if (versionTest.length !== 3) {
      logger.error(
        'You provided a version number the is not in the correct format (YY.x.y)'
      );
    }
    let intValue = parseInt(versionTest[0]);
    if (typeof intValue !== 'number') {
      logger.error(
        `The first part of the provided version number is not in correct format (${versionTest[0]})`
      );
    }
    intValue = parseInt(versionTest[1]);
    if (typeof intValue !== 'number') {
      logger.error(
        `The second part of the provided version number is not in correct format (${versionTest[1]})`
      );
    }
    intValue = parseInt(versionTest[2]);
    if (typeof intValue !== 'number') {
      logger.error(
        `The third part of the provided version number is not in correct format (${versionTest[2]})`
      );
    }
  }
  if (releaseType !== 'release' && releaseType !== 'fix') {
    logger.error(`The release type ${releaseType} is not recognized!`);
  }

  const now = new Date();

  let newRelease = '';

  const lastRelease = helper.getLastReleaseVersion();
  if (releaseType === 'fix') {
    newRelease =
      lastRelease[0] +
      '.' +
      lastRelease[1] +
      '.' +
      parseInt(lastRelease[2] + 1).toString();
  }
  if (releaseType === 'release') {
    const currentReleaseYear =
      now.getFullYear().toString()[2] + now.getFullYear().toString()[3];
    newRelease =
      currentReleaseYear !== lastRelease[0]
        ? lastRelease[0]
        : currentReleaseYear;

    let newV = parseInt(lastRelease[1]) + 1;
    newRelease += '.' + newV + '.0';
  }
  return newRelease;
};

const increaseBuildCounter = () => {
  const jsonData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'buildCounter.json'), 'utf8')
  );
  jsonData.buildNumber++;
  jsonData.buildDate = helper.getFormatedDate(true);
  fs.writeFileSync(
    path.join(process.cwd(), 'buildCounter.json'),
    JSON.stringify(jsonData, null, 2)
  );
  return jsonData;
};

const addToPackageJson = (buildNumber = '', buildDate = '', version = '') => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
  );
  if (buildNumber !== '') {
    packageJson.buildNumber = buildNumber;
  }
  if (buildDate !== '') {
    packageJson.buildDate = buildDate;
  }
  if (version !== '') {
    packageJson.version = version;
  }
  fs.writeFileSync(
    path.join(process.cwd(), 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
};

module.exports = { increaseBuildCounter, addToPackageJson, buildNewVersionNumber };
