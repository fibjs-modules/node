const fibjs_util = require('fibjs_util');

const util = {
  isDate(...argv){
    return fibjs_util.isDate(...argv);
  },
  isRegExp(...argv){
    return fibjs_util.isRegExp(...argv);
  },
  isSet(v){
    return v && Object.prototype.toString.call(v) === '[object Set]';
  },
  isMap(v){
    return v && Object.prototype.toString.call(v) === '[object Map]';
  },
  isAnyArrayBuffer(v){
    if(!v || !v.constructor || !v.constructor.name){
      return false;
    }
    return v.constructor.name === 'ArrayBuffer' 
            || v.constructor.name === 'SharedArrayBuffer';
  },
  isUint8Array(v){
    return v && v.constructor && v.constructor.name === 'Uint8Array';
  },
  isDataView(v){
    return v && v.constructor && v.constructor.name === 'DataView';
  },
  isTypedArray(v){
    return v && v.constructor && v.constructor.name === 'TypedArray';
  },
  isPromise(v){
    return v && v.constructor && v.constructor.name === 'Promise';
  },
};

module.exports = util;
