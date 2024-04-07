const path = require('path');
const fs = require('fs');

_releasesPath = 'public/releases/';
_releasesFile = 'releases.json';
_buildFile = 'build.json';

function _getFormatedDate(withTime = false) {
  let formatedDate = '';
  const now = new Date();
  const day = now.getDate().toString().length === 1 ? '0' + now.getDate() : now.getDate();
  const month = (now.getMonth() + 1).toString().length === 1 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1);
  const year = now.getFullYear();
  formatedDate = `${year}-${month}-${day}`;
  if (withTime) {
    const hours = now.getHours().toString().length === 1 ? '0' + now.getHours() : now.getHours();
    const minutes = now.getMinutes().toString().length === 1 ? '0' + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds().toString().length === 1 ? '0' + now.getSeconds() : now.getSeconds();
    formatedDate += ` ${hours}:${minutes}:${seconds} (TZ: ${Intl.DateTimeFormat().resolvedOptions().timeZone})`;
  }
  return formatedDate;
}

function _divider(short = false) {
  if (short) {
    console.log('----------------------');
  } else {
    console.log('-----------------------------------------------');
  }
}

function _newSection(title) {
  _divider();
  console.log(title);
  console.log('');
}

function help() {
  console.log('Usage: node helpers.js <arg1> <arg2> ... <argN>');
  console.log('-r: New release');
  console.log('-b: New build');
  _divider(true);
  console.log('-h: This help');
  process.exit(1);
}

function increaseBuildCounter() {
  const jsonData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'buildCounter.json'), 'utf8'))
  jsonData.buildNumber++;
  jsonData.buildDate = _getFormatedDate(true);
  fs.writeFileSync(path.join(process.cwd(), 'buildCounter.json'), JSON.stringify(jsonData, null, 2));
  return jsonData;
}

function addToPackageJson(buildNumber='', buildDate='', version='') {
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  if(buildNumber !== '') {
    packageJson.buildNumber = buildNumber;
  }
  if(buildDate !== '') {
    packageJson.buildDate = buildDate;
  }
  if(version !== '') {
    packageJson.version = version;
  }
  fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
}


// ---------------------------------------------------- New build
function newBuild() {
  _newSection('New build');
  const jsonData = increaseBuildCounter();
  addToPackageJson(jsonData.buildNumber, jsonData.buildDate,'');
  fs.copyFileSync(path.join(process.cwd(), 'buildCounter.json'), path.join(process.cwd(), _releasesPath,_buildFile));

}

// ---------------------------------------------------- New release
function newRelease() {
  _newSection('New release');
  if (process.argv.length === 3) {
    console.log('You need to specify the release version as the second argument');
    process.exit(1);
  }
  const newVersion = process.argv[3];

  _divider(true);
  console.log('Building new release with the version: ', process.argv[3]);
  console.log('Setting the new release')
  const jsonDataReleases = JSON.parse(fs.readFileSync(path.join(process.cwd(), _releasesPath, _releasesFile), 'utf8'))
  jsonDataReleases.unshift(newVersion);
  fs.writeFileSync(path.join(process.cwd(), _releasesPath, _releasesFile), JSON.stringify(jsonDataReleases, null, 2));
  console.log('New release added to releases.json');
  _divider(true);
  const jsonDataBuild = increaseBuildCounter();
  addToPackageJson(jsonDataBuild.buildNumber, jsonDataBuild.buildDate, newVersion);
  const jsonDataReleaseNotes = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'releaseNotes.json'), 'utf8'));
  jsonDataReleaseNotes.version = newVersion;
  jsonDataReleaseNotes.buildDate = jsonDataBuild.buildDate;
  jsonDataReleaseNotes.buildNumber = jsonDataBuild.buildNumber;
  jsonDataReleaseNotes.respository = 'https://github.com/tvx17/wlh/tree/' + newVersion;
  fs.writeFileSync(path.join(process.cwd(), 'releaseNotes.json'), JSON.stringify(jsonDataReleaseNotes, null, 2));
  fs.copyFileSync(path.join(process.cwd(), 'releaseNotes.json'), path.join(process.cwd(), _releasesPath,newVersion + '.json'));

}

process.stdout.write('\033c');
_newSection('Starting....');

if (process.argv.length === 2) {
  help();
}

switch (process.argv[2]) {
  case '-h':
    help();
    break;
  case '-r':
    newRelease();
    break;
  case '-b':
    newBuild();
    break;

}





