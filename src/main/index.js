const { app } = require('electron');
const path = require('path');
const process = require('process');

const filePath = '../child.js';
const fullPath = path.resolve(__dirname, filePath);

function createProcessFork() {
  const cp = require('child_process');
  try {

    const child = cp.fork(fullPath, [], { silent: true });

    child.stdout.on('data', (data) => {
      log(2, 'Fork', data.toString());
    });

    child.stderr.on('data', (data) => {
      log(3, 'Fork', data.toString());
    });
  }
  catch (error) {
    log(4, 'Fork', error.message);
  }
}

function createProcessExecFile() {
  try {
    const child = require('child_process').execFile('node', [fullPath], {}, (error, stdout, stderr) => {
      if (error) {
        log(1, 'ExecFile', error.message);
      }

      // log(2, 'ExecFile', stdout);
      // log(3, 'ExecFile', stderr);
    });

    child.stdout.on('data', (data) => {
      log(2, 'ExecFile', data);
    });

    child.stderr.on('data', (data) => {
      log(3, 'ExecFile', data);
    });
  }
  catch (error) {
    log(4, 'ExecFile', error.message);
  }
}

function log(type, sourceMethod, logMessage) {
  let source = 'Unknown';
  if (type == 1) {
    source = 'Error';
  } else if (type == 2) {
    source = 'Stdout';
  } else if (type == 3) {
    source = 'Stderr';
  } else if (type == 4) {
    source = 'Main Process';
  }

  const message = `${sourceMethod} - ${source}: ${logMessage}`;

  console.log(message);
}

app.on('ready', () => {
  console.log('Electron Version: ' + process.versions.electron)
  console.log('App Version: ' + app.getVersion())
  console.log('process.execPath: ' + process.execPath);
  console.log();

  createProcessFork({ name: "Fork" });
  createProcessExecFile({ name: "ExecFile" })
});


