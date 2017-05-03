const readdirRecursive = require('@fibjs/fs-readdir-recursive');
const path = require('path');
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

files.forEach(c => {
  // if(c.indexOf('test-buffer-write-noassert') == -1) return ;
  // if(c.indexOf('test-assert-fail') == -1) return ;
  
  try {
    node.run(c);
    console.log(path.basename(c) + ' √');
  } catch (error) {
    console.log(path.basename(c) + ' :');
    throw error;
  }
});
