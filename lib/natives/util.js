const fibjs_util = require('fibjs_util');
const fibjs_path = require('fibjs_path');
const _util = require(fibjs_path.join(__dirname, '../common/util.js'));

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
