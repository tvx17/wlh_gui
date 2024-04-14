const updater = require('./updater')
const logger = require('./logger')
const releaseNotes = require('./releaseNotes')
const git = require('./git')
const buildAndUpload = require('./buildAndUpload')
const github = require('./github')

async function main() {
  const type =updater.main(process.argv);
  if(type === 'build'){
    logger.finished();
    process.exit(0)
  }
  releaseNotes.write()
  await git();
  console.log('---> Building and uploading')
  await buildAndUpload()
  await github.main();
}

main();
