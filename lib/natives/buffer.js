const buffer = {
  kMaxLength: 12,
  kStringMaxLength: 12,
  byteLengthUtf8() {},
  setupBufferJS(proto, bindingObj) {
     proto.asciiSlice = asciiSlice.bind(proto);
     proto.base64Slice = base64Slice.bind(proto);
     proto.latin1Slice = latin1Slice.bind(proto);
     proto.hexSlice = hexSlice.bind(proto);
     proto.ucs2Slice = ucs2Slice.bind(proto);
     proto.utf8Slice = utf8Slice.bind(proto);
     proto.asciiWrite = asciiWrite.bind(proto);
     proto.base64Write = base64Write.bind(proto);
     proto.latin1Write = latin1Write.bind(proto);
     proto.hexWrite = hexWrite.bind(proto);
     proto.ucs2Write = ucs2Write.bind(proto);
     proto.utf8Write = utf8Write.bind(proto);
  },
  compareOffset() {},
  compare(buf1, buf2) {
    return new Buffer(buf1).compare(new Buffer(buf2));
  },
  compare_() {},
  createFromString() {},
  byteLengthUtf8() {},
  copy(obj, b, targetStart, sourceStart, sourceEnd) {
    b.set(obj, sourceStart, sourceEnd);
  },
  fill() {},
  indexOfBuffer() {},
  indexOfNumber() {},
  indexOfString() {},
  readDoubleBE() {},
  readDoubleLE() {},
  readFloatBE() {},
  readFloatLE() {},
  writeDoubleBE() {},
  writeDoubleLE() {},
  writeFloatBE() {},
  writeFloatLE() {},
  swap16() {},
  swap32() {},
  swap64() {},
};

function asciiSlice(){}
function base64Slice(){}
function latin1Slice(){}
function hexSlice(){}
function ucs2Slice(){}
function utf8Slice(){}
function asciiWrite(){}
function base64Write(){}
function latin1Write(){}
function hexWrite(){}
function ucs2Write(){}
function utf8Write(){}

module.exports = buffer;

// utf8Slice
// asciiSlice
// latin1Slice
// base64Slice
// hexSlice
// ucs2Slice