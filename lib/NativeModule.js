const native = require('native');
const SandBox = require('SandBox');

// ##### hack by ngot ###############
var nSb = new SandBox({ native });

function runInThisContext(code, options) {
  return nSb.addScript(options.filename, code);
}

// ##### hack by ngot ###############

function NativeModule(id) {
    this.filename = `${id}.js`;
    this.id = id;
    this.exports = {};
    this.loaded = false;
    this.loading = false;
}

NativeModule._source = native.require('natives');
NativeModule._cache = {};

NativeModule.require = function(id) {
  if (id === 'native_module') {
    return NativeModule;
  }

  if (id === 'native') {
    return native;
  }

  const cached = NativeModule.getCached(id);
  if (cached && (cached.loaded || cached.loading)) {
    return cached.exports;
  }

  if (!NativeModule.exists(id)) {
    // Model the error off the internal/errors.js model, but
    // do not use that module given that it could actually be
    // the one causing the error if there's a bug in Node.js
    const err = new Error(`No such built-in module: ${id}`);
    err.code = 'ERR_UNKNOWN_BUILTIN_MODULE';
    err.name = 'Error [ERR_UNKNOWN_BUILTIN_MODULE]';
    throw err;
  }

  // process.moduleLoadList.push(`NativeModule ${id}`);

  const nativeModule = new NativeModule(id);

  nativeModule.cache();
  nativeModule.compile();

  return nativeModule.exports;
};

NativeModule.getCached = function(id) {
  return NativeModule._cache[id];
};

NativeModule.exists = function(id) {
  console.log(Object.keys(NativeModule._source), ' sss ', id);
  return NativeModule._source.hasOwnProperty(id);
};

const config = native.require('config');

if (config.exposeInternals) {
  NativeModule.nonInternalExists = NativeModule.exists;

  NativeModule.isInternal = function(id) {
    return false;
  };
} else {
  NativeModule.nonInternalExists = function(id) {
    return NativeModule.exists(id) && !NativeModule.isInternal(id);
  };

  NativeModule.isInternal = function(id) {
    return id.startsWith('internal/');
  };
}


NativeModule.getSource = function(id) {
  return NativeModule._source[id];
};

NativeModule.wrap = function(script) {
  return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
};

NativeModule.wrapper = [
  'module.exports = (function (exports, require, module, __filename, __dirname) { ',
  '\n});'
];

NativeModule.prototype.compile = function() {
  var source = NativeModule.getSource(this.id);
  source = NativeModule.wrap(source);

  this.loading = true;

  try {
    const fn = runInThisContext(source, {
      filename: this.filename,
      lineOffset: 0,
      displayErrors: true
    });
    fn(this.exports, NativeModule.require, this, this.filename);

    this.loaded = true;
  } finally {
    this.loading = false;
  }
};

NativeModule.prototype.cache = function() {
  NativeModule._cache[this.id] = this;
};

module.exports = NativeModule;