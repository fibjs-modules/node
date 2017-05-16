const buffer = {
  kMaxLength: process.arch === 'x64' ? 0x7fffffff : 0x3fffffff,
  kStringMaxLength: (1 << 28) - 16,// copy from v8.h
  byteLengthUtf8(string) {
    let charLength = string.length;
    let byteLength = 0;
    let codePoint = null;
    let prevCodePoint = null;
    for (var i = 0; i < charLength; i++) {
      codePoint = string.charCodeAt(i);
      // handle 4-byte non-BMP chars
      // low surrogate
      if (codePoint >= 0xdc00 && codePoint <= 0xdfff) {// isLowSurrogate
        // when parsing previous hi-surrogate, 3 is added to byteLength
        if (prevCodePoint != null && (prevCodePoint >= 0xd800 && prevCodePoint <= 0xdbff)) { // isHighSurrogate
          byteLength += 1;
        }
        else {
          byteLength += 3;
        }
      }
      else if (codePoint <= 0x7f) {
        byteLength += 1;
      }
      else if (codePoint >= 0x80 && codePoint <= 0x7ff) {
        byteLength += 2;
      }
      else if (codePoint >= 0x800 && codePoint <= 0xffff) {
        byteLength += 3;
      }
      prevCodePoint = codePoint;
    }

    return byteLength;
  },
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
  createFromString() {

  },
  copy(obj, b, targetStart, sourceStart, sourceEnd) {
    b.set(obj, sourceStart, sourceEnd);
  },
  fill(buf, val, start, end, encoding) {
    if (typeof val === 'string') {
      val = new Buffer(val, encoding);
    }
    const b = new Buffer(buf.length);
    b.fill(val, start, end);
    if (start > 0)
      b.slice(start, end);
    buf.set(b, 0);
  },
  indexOfBuffer(buffer, val, byteOffset, encoding, dir) {
    return indexOf(buffer, val, byteOffset, encoding, dir);
  },
  indexOfNumber(buffer, val, byteOffset, dir) {
    return indexOf(buffer, val, byteOffset, undefined, dir);
  },
  indexOfString(buffer, val, byteOffset, encoding, dir) {
    return indexOf(buffer, val, byteOffset, encoding, dir);
  },
  readDoubleBE(buf, offset) {
    buf = new Buffer(buf);
    return buf.readDoubleBE(offset);
  },
  readDoubleLE(buf, offset) {
    buf = new Buffer(buf);
    return buf.readDoubleLE(offset);
  },
  readFloatBE(buf, offset) {
    buf = new Buffer(buf);
    return buf.readFloatBE(offset);
  },
  readFloatLE(buf, offset) {
    buf = new Buffer(buf);
    return buf.readFloatLE(offset);
  },
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
  swap16(obj) {
    shouldBuffer(obj);

  },
  swap32() {
    shouldBuffer(obj);

  },
  swap64() {
    shouldBuffer(obj);

  },
};

function shouldBuffer(obj) {
  if (!isBuffer(obj)) {
    const e = new Error('argument should be a Buffer');
    e.name = 'TypeError';
    throw e;
  }
}

function isBuffer(obj) {
  return (obj instanceof Uint8Array) || (obj.constructor.name === 'Buffer');
}

function numberWrite(method, obj, val, offset, noAssert) {
  shouldBuffer(obj)
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
  } else {
    end = end * 2
  }
  return new Buffer(this).toString('base64', start, end);
}

function latin1Slice(start, end) {
  if (this.length === end) {
    end = -1;
  } else {
    end = end * 2
  }
  return new Buffer(this).toString('latin1', start, end);
}

function hexSlice(start, end) {
  if (this.length === end) {
    end = -1;
  } else {
    end = end * 2
  }
  return new Buffer(this).toString('hex', start, end);
}

function ucs2Slice(start, end) {
  if (this.length === end) {
    end = -1;
  } else {
    end = end * 2
  }
  return new Buffer(this).toString('ucs2', start, end);
}

function utf8Slice(start, end) {
  if (this.length === end) {
    end = -1;
  } else {
    end = end * 2
  }
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
  return write(this, 'utf-16le', string, offset, length);
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
  len = buf.length;
  obj.set(buf, offset);
  return len;
}

function indexOf(buffer, val, byteOffset, encoding, dir) {
  let buf1;
  if (isBuffer(val)) {
    if (!val.length) return -1;
    buf1 = new Buffer(val);
  } else if (typeof val === 'number') {
    buf1 = new Buffer([val]);
  } else {
    if (!val.length) return -1;
    if ((encoding == "ucs2") || (encoding == "ucs-2") || (encoding == "utf16le")) {
      encoding = "utf-16le";
    } else if (encoding === 'binary') {
      encoding = 'latin1';
    }
    encoding = encoding || 'utf8';
    buf1 = new Buffer(val, encoding);
  }
  let buf = new Buffer(buffer);

  if (byteOffset === -0x80000000) {
    byteOffset = -buffer.length;
  }

  if (byteOffset === 0x7fffffff) {
    return -1;
  }

  if (byteOffset < 0) {
    buf = buf.slice(byteOffset);
    var i = buf.indexOf(buf1);
    if (i >= 0) {
      i = i + buffer.length + byteOffset;
    }
    return i;
  } else {
    return buf.indexOf(buf1, byteOffset);
  }
}

module.exports = buffer;
