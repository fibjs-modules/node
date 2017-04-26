const path = require('path');
const fs = require('fs');
const nrequire = require('../');
const readdirRecursive = require('@fibjs/fs-readdir-recursive');

const testBasedir = path.join(__dirname, 'node');

let files = readdirRecursive(testBasedir);
files = files.filter(f => {
  f = path.basename(f);
  return f.startsWith('test-');
});

files = files.map(f => {
  return path.join(testBasedir, f);
});

files.forEach(c => {
  try {
    nrequire.run(c);
    console.log(path.basename(c) + ' √');
  } catch (error) {
    console.log(path.basename(c) + ' :');
    throw error;
  }
});
