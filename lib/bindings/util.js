const fibjs_util = require('util');
const _util = require('../common/util.js');

const util = {
  isDate(...argv){
    return fibjs_util.isDate(...argv);
  },
  isRegExp(...argv){
    return fibjs_util.isRegExp(...argv);
  },
  isSet: _util.isSet,
  isMap: _util.isMap,
  isAnyArrayBuffer: _util.isAnyArrayBuffer,
  isUint8Array: _util.isUint8Array,
  isDataView: _util.isDataView,
  isTypedArray: _util.isTypedArray,
  isPromise: _util.isPromise,
  getProxyDetails() { },
};

module.exports = util;
