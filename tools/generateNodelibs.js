const fs = require('fs');
const path = require('path');
const util = require('util');
const read = require('@fibjs/fs-readdir-recursive');
const mkdirp = require('@fibjs/mkdirp');
const rmdirr = require('@fibjs/rmdirr');

const nodeSourceLibsDir = path.join(__dirname, './node/lib');
const nodeLibsDir = path.join(__dirname, '../lib/node/lib');

const patt = /process\.binding\(\s*((\"[^\'\"]*\")|(\'[^\'\"]*\'))\s*\)/g;
const depsPatt = /require\s*\(\s*((\"[^\'\"]*\")|(\'[^\'\"]*\'))\s*\)/g;
const header = `// ##### This is auto generated! Please don't modify it! #####
const native = require('native');
// ##### This is auto generated! Please don't modify it! #####

`;

mkdirp(nodeLibsDir);
rmdirr(nodeLibsDir);

let libs = read(nodeSourceLibsDir).filter(f => f.endsWith('.js'));

let nativeLibs = [];
let deps = {};

libs.forEach(f => {
  const fPath = path.join(nodeSourceLibsDir, f);
  let content = fs.readFile(fPath).toString();
  const k = f.slice(0, -3);
  deps[k] = [];
  let a;
  while (a = depsPatt.exec(content)) {
    a = a[1];
    a = a.slice(0, -1);
    a = a.slice(1);
    deps[k].push(a);
  }
  content = content.replace(patt, (...argv) => {
    let m = argv[1];
    m = m.slice(0, -1);
    m = m.slice(1);
    nativeLibs.push(m);
    return `native.require(${argv[1]})`;
  });
  let tpPath = path.join(nodeLibsDir, f);
  content = header + content;
  save(tpPath, content);
});

nativeLibs = util.unique(nativeLibs);

function save(tpPath, content) {
  if (!fs.exists(path.dirname(tpPath))) {
    mkdirp(path.dirname(tpPath));
  }
  fs.writeFile(tpPath, content);
}

const modulesFilePath = path.join(path.dirname(nodeLibsDir), 'modules.json');
const depsFilePath = path.join(path.dirname(nodeLibsDir), 'deps.json');
fs.writeFile(modulesFilePath, JSON.stringify(nativeLibs, null, 2));
fs.writeFile(depsFilePath, JSON.stringify(deps, null, 2));

console.log('generate done!');