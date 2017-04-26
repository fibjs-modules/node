const { SandBox } = require('vm');
const path = require('path');
const fs = require('fs');
require('./global');

const mocks = {};

const polyfillBasedir = path.resolve(__dirname, './polyfills');
const polyfills = fs.readdir(polyfillBasedir);

polyfills.forEach(mod => {
  if (mod.endsWith('.js')) {
    const modp = path.resolve(polyfillBasedir, mod);
    mocks[mod.slice(0, mod.length - 3)] = require(modp);
  }
});

function proxyGenerator(mod) {
  return new Proxy({}, {
    get(target, name) {
      if (!mocks[mod][name]) {
        mocks[mod][name] = function(...argv) {
          try {
            return require(mod)[name](...argv);
          } catch (error) {
            //todo modify error stack...
            throw error;
          }
        }
      }
      return mocks[mod][name];
    }
  });
}

const nodeLib = {};

Object.keys(mocks).forEach(mod => nodeLib[mod] = proxyGenerator(mod));

const nodeSandbox = new SandBox(nodeLib);

function Node(...argv) {
  return nodeSandbox.require(...argv);
};

Node.run = function run(...argv) {
  return nodeSandbox.run(...argv);
}

Node.run = function run(...argv) {
  return nodeSandbox.require(...argv);
}

module.exports = Node;
