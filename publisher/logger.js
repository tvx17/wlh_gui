const clearCmd = () => {
  process.stdout.write('\033c');
};

const endSection = () => {
  console.log('========================================');
}

const newSection = (title) => {
  divider();
  console.log(title);
  console.log('');
};

const divider = (short = false) => {
  if (short) {
    console.log('----------------------');
  } else {
    console.log('-----------------------------------------------');
  }
};

const help = () => {
  message('Usage: node index.js <arg1> <arg2>');
  message('<arg1> mandatory');
  message('-r: New release');
  message('-b: New build');
  divider(true);
  message('-h: This help');
  divider(true);
  console.log('<arg2>: optional (default is release) [without *]');
  message('* release: will build a new full release');
  message('* fix: will build a new fix release');
  message('* Version number with formating YY.x.x -> 24.2.1');
  divider();
  process.exit(1);
};

const message = (message) => {
  console.log(message);
};

const finished = () => {
  console.log('+++++++++++++++++++++++++++++++++++++')
  console.log('App finished.');
  console.log('+++++++++++++++++++++++++++++++++++++')
};

const error = (text, exit = true) => {
  message('ERROR: ' + text);
  if(exit) {
    process.exit(1);
  }
};

module.exports = { clearCmd, newSection, divider, help, message, error, endSection,finished };
