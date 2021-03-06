const util = {
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
    return v && v.constructor && (v.constructor.name === 'Uint8Array' 
      || v.constructor.name === 'Buffer');
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
