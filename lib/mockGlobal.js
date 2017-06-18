const mockProcess = require('./mockProcess');

const mockGlobal = {};

const mockGlobalFunctions = {
  $clearImmediate: clearImmediate,
  $clearInterval: clearInterval,
  $clearTimeout: clearTimeout,
  $setImmediate: setImmediate,
  $setInterval: setInterval,
  $setTimeout: setTimeout,
};

const mockGlobalProperties = {
  process: mockProcess,

  $console: console,
  $global: global,
  $Int64: Int64,
};

Object.assign(mockGlobal, mockGlobalFunctions);
Object.assign(mockGlobal, mockGlobalProperties);

module.exports = mockGlobal;
