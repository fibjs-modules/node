const _fs = require('fs');

const fs = {
  getStatValues() {
    return [
      16777218,
      33152,
      1,
      501,
      20,
      0,
      4096,
      89394503,
      3240,
      8,
      1497760915000,
      1497761033000,
      1497761033000,
      1492102272000,
      2.1406461555e-314,
      0,
      2.142732327e-314,
      4.172034953330294e-309,
      2.1333774706e-314,
      NaN,
      NaN,
      2.140659599e-314,
      0,
      0,
      NaN,
      0,
      0,
      0];
  },

  internalModuleReadFile(...argv) {
    return _fs.readFile(...argv).toString();
  },

  internalModuleStat(...argv) {
    try {
      const stat = _fs.stat(...argv);
      if (stat.isFile()) {
        return 0;
      } else {
        return 1;
      }
    } catch (e) {
      return -1;
    }
  },

  lstat(path, req) {
    if (req && req.oncomplete) {
      return _fs.lstat(path, req.oncomplete);
    } else {
      return _fs.lstat(path);
    }
  },

  open(path, flags, mode){

  },
};

module.exports = fs;
