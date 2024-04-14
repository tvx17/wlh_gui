const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const level = (level, text) => {
  let _text = '';
  switch (level) {
    case 1:
      _text = '# ';
      break;
    case 2:
      _text = '## ';
      break;
    case 3:
      _text = '### ';
      break;
    case 4:
      _text = '#### ';
      break;
    default:
      throw new Error('Invalid level');
  }
  return _text + text + '\n';
};

const bold = (text) => {
  return '**' + text + '**';
};

const emptyTableHeader = () => {
  return '| | |\n| --- | --- |\n';
};
const tableRow = (data) => {
  let _text = '| ';
  for (let i = 0; i < data.length; i++) {
    _text += data[i] + ' | ';
  }
  return _text + '\n';
};

const listEntry = (text) => {
  return '- ' + text + '\n';
}

const reference = (ref) => {
  return `([Reference: ${ref}](https://github.com/tvx17/wlh/issues/${ref}))`
}
const nl = (count = 1) => {
  let returns = '';
  for(let counter = 1 ; counter <= count; counter++) {
    returns += '\n';
  }
  return returns;
}

const write = () => {
  logger.newSection('Writing release notes to file...');
  const markDown = build();
  fs.writeFileSync(path.join(process.cwd(), 'release_notes.md'), markDown);
  logger.endSection();
};

const build = () => {
  let markDown = '';

  const jsonDataReleaseNotes = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'releaseNotes.json'), 'utf8')
  );

  markDown += level(1, 'WLH - Writer\'s little helper');
  markDown += level(2, `Release notes ${bold(jsonDataReleaseNotes['version'])}} of WLH`);
  markDown += bold(jsonDataReleaseNotes['description']) + nl(2);

  markDown += emptyTableHeader();
  markDown += tableRow([bold('Build date'), jsonDataReleaseNotes['buildDate']]);
  markDown += tableRow([bold('Build number'), jsonDataReleaseNotes['buildNumber']]);
  markDown += tableRow([bold('Repository'), `[${jsonDataReleaseNotes['version']}](https://github.com/tvx17/wlh/tree/${jsonDataReleaseNotes['version']})`]);

  markDown += level(2, `Changelog for v${jsonDataReleaseNotes['version']}`);

  for (const key of Object.keys(jsonDataReleaseNotes['changelog'])) {
    if (
      jsonDataReleaseNotes['changelog'].hasOwnProperty(key) &&
      jsonDataReleaseNotes['changelog'][key].length > 0
    ) {
      markDown += level(3, key[0].toUpperCase() + key.substring(1));

      for (const data of jsonDataReleaseNotes['changelog'][key]) {
        markDown += listEntry(data['text']);
        if (data.hasOwnProperty('ref')) {
          markDown += reference(data['ref']);
        }
        markDown += nl()
      }
    }
  }
  return markDown;


};

module.exports = { build, write };
