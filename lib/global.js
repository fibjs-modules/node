const config = require('./config/global').config;

process.config = config;

process.versions = { 
  http_parser: '2.7.0',
  node: '6.9.0',
  v8: '5.1.281.84',
  uv: '1.9.1',
  zlib: '1.2.8',
  ares: '1.10.1-DEV',
  icu: '57.1',
  modules: '48',
  openssl: '1.0.2j' 
};

process.emitWarning = function emitWarning (...argv) {
  // body
}

process.stdout = {
  write: function write (...argv) {
    // body
  },
};

process.stderr = {
  write: function write (...argv) {
    // body
  },
};

process._setupDomainUse = function _setupDomainUse (...argv) {
  // body
}
