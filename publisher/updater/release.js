const logger = require('../logger');
const helper = require('../helper');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const updaterHelper = require('./updaterHelper.js');

function newRelease(args) {
  logger.newSection('New release');
  let newVersionType = 'release';
  if (args.length === 4) {
    switch (args[3]) {
      case 'release':
        newVersionType = 'release';
        break;
      case 'fix':
        newVersionType = 'fix';
        break;
    }
  }

  const newVersion = updaterHelper.buildNewVersionNumber(newVersionType);

  logger.divider(true);
  logger.message('Building new release with the version: ' + newVersion);
  logger.message('Setting the new release');
  const jsonDataReleases = helper.getReleases();
  jsonDataReleases.unshift(newVersion);
  helper.setReleases(jsonDataReleases);

  logger.message('New release added to releases.json');
  logger.divider(true);

  const jsonDataBuild = updaterHelper.increaseBuildCounter();
  updaterHelper.addToPackageJson(jsonDataBuild.buildNumber, jsonDataBuild.buildDate, newVersion);

  const jsonDataReleaseNotes = helper.getReleaseNotes();

  jsonDataReleaseNotes.version = newVersion;
  jsonDataReleaseNotes.buildDate = jsonDataBuild.buildDate;
  jsonDataReleaseNotes.buildNumber = jsonDataBuild.buildNumber;
  jsonDataReleaseNotes.respository = 'https://github.com/tvx17/wlh/tree/' + newVersion;

  helper.writeJson(['releaseNotes.json'], jsonDataReleaseNotes);
  helper.copy(['releaseNotes.json'], [config.releasesPath, newVersion + '.json']);
}

module.exports = newRelease;
