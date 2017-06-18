const readdirRecursive = require('@fibjs/fs-readdir-recursive');
const path = require('path');
const co = require('coroutine');
const fs = require('fs');
const node = require('../');

const testBasedir = path.join(__dirname, 'node');

let files = readdirRecursive(testBasedir);
files = files.filter(f => {
  f = path.basename(f);
  return f.startsWith('test-');
});

files = files.map(f => {
  return path.join(testBasedir, f);
});

const nodeBin = path.join(__dirname, '../bin/node.js');

co.parallel(files, runTest, 20);

function runTest(testCase) {
  // if(testCase.indexOf('test-buffer-includes') === -1) return;
  var p = process.open(nodeBin, [testCase]);
  var r, e = '';
  while (r = p.readLine()) {
    if (/\d{0,20}Error:\s.*/.test(r) || !!e) {
      e += '\n' + r;
    } else {
      console.log(r);
    }
  }
  if (e) {
    console.log(e);
    process.exit(1);
  } else {
    console.log(path.basename(testCase) + ' √');
  }
}
