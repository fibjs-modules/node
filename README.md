# @fibjs/node

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![appveyor build status][appveyor-image]][appveyor-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@fibjs/node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@fibjs/node
[travis-image]: https://img.shields.io/travis/fibjs-modules/node.svg?style=flat-square
[travis-url]: https://travis-ci.org/fibjs-modules/node
[appveyor-image]: https://ci.appveyor.com/api/projects/status/e9u3e4hrit4h8sna/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/ngot/node
[codecov-image]: https://img.shields.io/codecov/c/github/fibjs-modules/node.svg?style=flat-square
[codecov-url]: https://codecov.io/github/fibjs-modules/node?branch=master
[david-image]: https://img.shields.io/david/fibjs-modules/node.svg?style=flat-square
[david-url]: https://david-dm.org/fibjs-modules/node
[snyk-image]: https://snyk.io/test/npm/@fibjs/node/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@fibjs/node
[download-image]: https://img.shields.io/npm/dm/@fibjs/node.svg?style=flat-square
[download-url]: https://npmjs.org/package/@fibjs/node

Node.js runtime which works on fibjs platform. You should use this module only when you want to use some Node.js's module; please use fibjs native module first!

## Install

```bash
$ npm i @fibjs/node --save
```

## Usage

```js
const node = require('@fibjs/node');
const mod1 = node('mod1');
const mod2 = node.require('mod2');

// or you can run a js file
node.run('./app.js'); // path to js file
```

Also, this module can be used as a cli. You can invoke like this:

```bash
$ ./node_modules/.bin/node app.js
```

## API

- `node()` require a npm module.
- `node.require()` require a npm module.
- `node.run()` execute a Node.js js script file.

## Questions & Suggestions

Please open an issue [here](https://github.com/fibjs-modules/node/issues).

## License

[MIT](LICENSE)