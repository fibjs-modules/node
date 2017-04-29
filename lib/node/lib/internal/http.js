// ##### This is auto generated! Please don't modify it! #####
const native = require('native');
// ##### This is auto generated! Please don't modify it! #####

'use strict';

function ondrain() {
  if (this._httpMessage) this._httpMessage.emit('drain');
}

module.exports = {
  outHeadersKey: Symbol('outHeadersKey'),
  ondrain,
};
