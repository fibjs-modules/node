const fs = require('fs');
const path = require('path');
const readdir = require('@fibjs/fs-readdir-recursive');

const sourceDir = path.join(__dirname, '../node/lib');
const sourceFiles = readdir(sourceDir);

const natives = {};

sourceFiles.forEach(file => {
  if (file.endsWith('.js')) {
    const fullPath = path.resolve(sourceDir, file);
    const src = fs.readFile(fullPath).toString();
    natives[file.slice(0, -3)] = src;
  }
});

natives.config = '{}';

module.exports = natives;
