const config = require('./config/global').config;

process.config = config;

process.binding = function binding(mod) {
  switch (mod) {
    case 'timer_wrap':
      return Date;
    default:
  }
};
