const vm = require('vm');
const path = require('path');

let thisVM;

function ContextifyScript(code, options) {
  if (!thisVM) {
    const mockGlobal = require('../mockGlobal.js');
    thisVM = new vm.SandBox({}, mockGlobal);
  }
  this.code = code;
  this.options = options;
}

ContextifyScript.prototype.runInThisContext = function runInThisContext(...argv) {
  return thisVM.addScript(this.options.filename, `module.exports = ${this.code}`);
};

ContextifyScript.prototype.runInContext = function runInContext(...argv) {
  // body
};

const contextify = {
  ContextifyScript,
};

module.exports = contextify;
