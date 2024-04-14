const logger = require('../logger.js');
const config = require('../config.js');
const helper = require('../helper.js');
const updaterHelper = require('./updaterHelper.js');

const newBuild = () => {
  logger.newSection('New build');
  const jsonData = updaterHelper.increaseBuildCounter();
  updaterHelper.addToPackageJson(jsonData.buildNumber, jsonData.buildDate, '');
  helper.copy(['buildCounter.json'], [config.releasesPath, config.buildFile]);
  logger.message('Finished creating a new build');
}

module.exports =  newBuild ;
