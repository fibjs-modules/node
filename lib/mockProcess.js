const path = require('path');
const fs = require('fs');
const readdir = require('@fibjs/fs-readdir-recursive');

const bindingsDir = path.join(__dirname, './bindings');
const bindings = {};

readdir(bindingsDir).forEach(binding => {
  bindings[binding.slice(0, -3)] = require(path.join(bindingsDir, binding));
});

const mockProcess = {};

const mockProcessFunctions = {
  abort() {

  },
  chdir(...argv) {
    return process.chdir(...argv);
  },
  cpuUsage([previousValue]) {

  },
  cwd() {
    return process.cwd();
  },
  disconnect() {

  },
  emitWarning(warning, name, ctor) {

  },
  exit(...argv) {
    return process.exit(...argv);
  },
  getegid() {

  },
  geteuid() {

  },
  getgid() {

  },
  getgroups() {

  },
  getuid() {

  },
  hrtime([time]) {

  },
  initgroups(user, extra_group) {

  },
  kill(pid, signal) {

  },
  memoryUsage() {
    return process.memoryUsage();
  },
  nextTick(...args) {
    return process.nextTick(...args);
  },
  send(message, sendHandle, options, callback) {

  },
  setegid(id) {

  },
  seteuid(id) {

  },
  setgid(id) {

  },
  setgroups(groups) {

  },
  setuid(id) {

  },
  umask(...args) {
    return process.umask(...args);
  },
  uptime() {
    return process.uptime();
  },

  _setupProcessObject() { },

  _setupPromises() { },

  _setupNextTick() { },
};

const mockProcessProperties = {
  arch: process.arch,
  argv: process.argv,
  argv0: '',
  channel: '',
  config: '',
  connected: '',
  env: process.env,
  execArgv: process.execArgv,
  execPath: process.execPath,
  exitCode: '',
  mainModule: '',
  pid: '',
  platform: process.platform,
  release: '',
  stderr: '',
  stdin: '',
  stdout: '',
  title: '',
  version: process.version,
  versions: [],
  connected: '',
  moduleLoadList: [],
};

Object.assign(mockProcess, mockProcessFunctions);
Object.assign(mockProcess, mockProcessProperties);
mockProcess.binding = binding => bindings[binding];

module.exports = mockProcess;
