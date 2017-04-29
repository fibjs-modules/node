const readdir = require('@fibjs/fs-readdir-recursive');
const { SandBox } = require('vm');
const path = require('path');
const fs = require('fs');

require('./global');

// ########## Native SandBox ##########
const nativeDir = path.resolve(__dirname, './natives');
const nativeFiles = readdir(nativeDir);
const nativeSandBox = new SandBox({
  fibjs_path: path,
  fibjs_fs: fs,
  fibjs_readdir: readdir,
});

nativeFiles.forEach(file => {
  if (file.endsWith('.js')) {
    const fullPath = path.resolve(nativeDir, file);
    const src = fs.readFile(fullPath).toString();
    const dirname = path.join(__dirname, './natives');
    const filename = path.join(dirname, file);
    
    const code = `
      const dirname = '${dirname}';
      const filename = '${filename}';

      (function (exports, require, module, __filename, __dirname) {
          ${src}
      })(exports, require, module, filename, dirname);
    `;
    nativeSandBox.addScript(file, code);
  }
});

// ########## Native SandBox ##########


// ########## JS SandBox ##########
const nodeSandbox = new SandBox({
  native: nativeSandBox,
  SandBox,
});

const NativeModule = fs.readFile(path.join(__dirname, 'NativeModule.js')).toString();

nodeSandbox.addScript('NativeModule.js', NativeModule);

const libFiles = nativeSandBox.require('natives');
const skips = [ 'v8' ];// temporarily ignore 

for (let m in libFiles) {
  if (skips.indexOf(m) > -1) {
    continue;
  }
  if (!m.startsWith('_') && !m.startsWith('internal/')) {
    nodeSandbox.addScript(`${m}.js`, `
      const NativeModule = require('NativeModule');
      module.exports = NativeModule.require('${m}');
    `);
  }
}

// ########## JS SandBox ##########

function Node(...argv) {
  return nodeSandbox.require(...argv);
};

Node.require = function require(...argv) {
  return nodeSandbox.require(...argv);
}

Node.run = function run(...argv) {
  return nodeSandbox.require(...argv);
}

module.exports = Node;
