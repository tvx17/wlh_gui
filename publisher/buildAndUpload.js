const logger = require('./logger');
const config = require('./config');
var child_process = require('child_process');

const buildAndUpload = async () => {
  const promise = new Promise((resolve, reject) => {
    _run('quasar build --mode electron --publish always', [], function (output, exit_code) {
      logger.message('Done building and uploading to releases!')
    });
  })
  await promise

}

async function _run(command, args, callback) {
  logger.newSection('Building and uploading to releases')

  let child = child_process.spawn(command, args, { shell: true });

  let scriptOutput = '';

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function (data) {
    logger.message(data);

    data = data.toString();
    scriptOutput += data;
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    logger.error(data, false)

    data = data.toString();
    scriptOutput += data;
  });

  child.on('close', function (code) {
    callback(scriptOutput, code);
  });
}

module.exports = buildAndUpload
