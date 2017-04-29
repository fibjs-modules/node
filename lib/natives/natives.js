const fs = require('fibjs_fs');
const path = require('fibjs_path');
const readdir = require('external_readdir');

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

module.exports = natives;
