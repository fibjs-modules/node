const fibjs_os = require('fibjs_os');

const os = {
  totalmem () {},
  getCPUs () {
    return fibjs_os.CPUInfo();
  },
  getLoadAvg () {},
  getHostname(){},
  getUptime(){},
  getFreeMem(){},
  getTotalMem(){},
  getOSType(){},
  getOSRelease(){},
  getInterfaceAddresses() {
    return fibjs_os.networkInfo();
  },
  getHomeDirectory(){},
  getUserInfo(){},
};

module.exports = os;
