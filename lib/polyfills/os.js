const os = require('os');

const osMod = {
  cpus() {
    return os.CPUs();
  },
  networkInterfaces() {
    return os.networkInfo();
  }
};

module.exports = osMod;
