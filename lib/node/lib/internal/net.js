// ##### This is auto generated! Please don't modify it! #####
const native = require('native');
// ##### This is auto generated! Please don't modify it! #####

'use strict';

// Check that the port number is not NaN when coerced to a number,
// is an integer and that it falls within the legal range of port numbers.
function isLegalPort(port) {
  if ((typeof port !== 'number' && typeof port !== 'string') ||
      (typeof port === 'string' && port.trim().length === 0))
    return false;
  return +port === (+port >>> 0) && port <= 0xFFFF;
}

module.exports = {
  isLegalPort
};
