const buffer = {
  kMaxLength: process.arch === 'x64' ? 0x7fffffff : 0x3fffffff,
  kStringMaxLength: (1 << 28) - 16,// copy from v8.h
  byteLengthUtf8() { },
  setupBufferJS(proto, bindingObj) {
    proto.asciiSlice = asciiSlice;
    proto.base64Slice = base64Slice;
    proto.latin1Slice = latin1Slice;
    proto.hexSlice = hexSlice;
    proto.ucs2Slice = ucs2Slice;
    proto.utf8Slice = utf8Slice;

    proto.asciiWrite = asciiWrite;
    proto.base64Write = base64Write;
    proto.latin1Write = latin1Write;
    proto.hexWrite = hexWrite;
    proto.ucs2Write = ucs2Write;
    proto.utf8Write = utf8Write;
  },
  compareOffset() { },
  compare(buf1, buf2) {
    return new Buffer(buf1).compare(new Buffer(buf2));
  },
  compare_() { },
  createFromString() { },
  byteLengthUtf8() { },
  copy(obj, b, targetStart, sourceStart, sourceEnd) {
    b.set(obj, sourceStart, sourceEnd);
  },
  fill() { },
  indexOfBuffer() { },
  indexOfNumber() { },
  indexOfString() { },
  readDoubleBE() { },
  readDoubleLE() { },
  readFloatBE() { },
  readFloatLE() { },
  writeDoubleBE(obj, val, offset, noAssert) {
    numberWrite('writeDoubleBE', obj, val, offset, noAssert);
  },
  writeDoubleLE(obj, val, offset, noAssert) {
    numberWrite('writeDoubleLE', obj, val, offset, noAssert);
  },
  writeFloatBE(obj, val, offset, noAssert) {
    numberWrite('writeFloatBE', obj, val, offset, noAssert);
  },
  writeFloatLE(obj, val, offset, noAssert) {
    numberWrite('writeFloatLE', obj, val, offset, noAssert);
  },
  swap16() { },
  swap32() { },
  swap64() { },
};

function numberWrite(method, obj, val, offset, noAssert) {
  if (!(obj instanceof Uint8Array)) {
    const e = new Error('argument should be a Buffer');
    e.name = 'TypeError';
    throw e;
  }
  if (!noAssert) {
    if (offset > obj.length) {
      const e = new Error('out of range index');
      e.name = 'RangeError';
      throw e;
    }
  }

  const buf = new Buffer(obj);
  try {
    buf[method](val, offset, noAssert);
    obj.set(buf, 0);
  } catch (error) {
    if (!noAssert) {
      const e = new Error('out of range index');
      e.name = 'RangeError';
      throw e;
    }
  }
}

function asciiSlice(start, end) {
  if (this.length === end) {
    end = -1;
  }
  return new Buffer(this).toString('ascii', start, end);
}

function base64Slice(start, end) {
  if (this.length === end) {
    end = -1;
  }
  return new Buffer(this).toString('base64', start, end);
}

function latin1Slice(start, end) {
  if (this.length === end) {
    end = -1;
  }
  return new Buffer(this).toString('latin1', start, end);
}

function hexSlice(start, end) {// hex toString 的 end 不对，end，这里的end当等于 this.length,并不等于 hex后的length
  if (this.length === end) {
    end = -1;
  }
  return new Buffer(this).toString('hex', start, end);
}

function ucs2Slice(start, end) {
  return new Buffer(this).toString('ucs2', start, end);
}

function utf8Slice(start, end) {
  return new Buffer(this).toString('utf8', start, end);
}

function asciiWrite(string, offset, length) {
  return write(this, 'ascii', string, offset, length);
}

function base64Write(string, offset, length) {
  return write(this, 'base64', string, offset, length);
}

function latin1Write(string, offset, length) {
  return write(this, 'latin1', string, offset, length);
}

function hexWrite(string, offset, length) {
  if (string.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }

  var str = '';
  for (let i = 0; i < string.length; i += 2) {
    var t = string[i] + string[i + 1];
    if (/[A-Fa-f0-9]/.test(t[0]) && /[A-Fa-f0-9]/.test(t[1])) {
      str += t;
    } else {
      break;
    }
  }
  return write(this, 'hex', str, offset, length);
}

function ucs2Write(string, offset, length) {
  return write(this, 'ucs2', string, offset, length);
}

function utf8Write(string, offset, length) {
  return write(this, 'utf8', string, offset, length);
}

function write(obj, charset, data, offset, length) {
  if (data.length === 0)
    return 0;
  if (offset > length)
    throw new Error("Offset is out of bounds");

  let buf = new Buffer();
  let len = buf.append(data, charset);
  while (!buf[buf.length - 1]) {
    buf = buf.slice(0, buf.length - 1);
  }
  len = buf.length;
  obj.set(buf, offset);
  return len;
}

module.exports = buffer;
