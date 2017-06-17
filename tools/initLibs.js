const path = require('path');
const copy = require('@fibjs/copy');

const src = path.join(__dirname, './node/lib');
const target = path.join(__dirname, '../lib/node/lib');

copy(src, target);

console.log('process done!');
