const fibjs_os = require('fibjs_os');

const os = {
  totalmem () {
    return fibjs_os.totalmem();
  },
  getCPUs () {
    return fibjs_os.cpus();
  },
  getLoadAvg () {
    return fibjs_os.loadavg();
  },
  getHostname(){
    return fibjs_os.hostname();
  },
  getUptime(){
    return fibjs_os.uptime();
  },
  getFreeMem(){
    return fibjs_os.freemem();
  },
  getTotalMem(){
    return fibjs_os.totalmem();
  },
  getOSType(){
    return fibjs_os.type();
  },
  getOSRelease(){
    return fibjs_os.release();
  },
  getInterfaceAddresses() {
    return fibjs_os.networkInterfaces();
  },
  getHomeDirectory(){
    return fibjs_os.homedir();
  },
  getUserInfo(...argvs){
    return fibjs_os.userInfo(...argvs);
  },
};

module.exports = os;
