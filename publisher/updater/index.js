const logger = require('../logger.js');
const helper = require('../helper.js');
const newBuild = require('./build.js');
const newRelease = require('./release.js');

const _init = () => {
  logger.clearCmd();
  logger.newSection('Starting...');
};
const _route =(args) => {
  switch (args[2]) {
      case '-h':
        logger.help();
        break;
      case '-r':
        newRelease(args);
        return 'release';
      case '-b':
        newBuild()
        return 'build';
    }
}

const main = (args) => {
  _init();
  helper.checkArgs(args);

  const _type = _route(args);
  logger.endSection();
  return _type;

};

module.exports = { main };
