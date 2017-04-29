const fs = require('fibjs_fs');
const path = require('fibjs_path');
const readdir = require('fibjs_readdir');

const sourceDir = path.join(__dirname, '../node/lib');
console.log('sourceDir:', sourceDir);
const sourceFiles = readdir(sourceDir);

const natives = {};

sourceFiles.forEach(file => {
  console.log('fff:', file);
  if (file.endsWith('.js')) {
    const fullPath = path.resolve(sourceDir, file);
    const src = fs.readFile(fullPath).toString();
    // file = path.basename(file);
    natives[file.slice(0, -3)] = src;
  }
});

module.exports = natives;
