const { SandBox } = require('vm');

var sb1 = new SandBox({
  a:2
});

var sb2 = new SandBox({
  b:1,
  sb:sb1
});

sb2.addScript('app.js', `
  var b = require('b');
  console.log('b:', b);

  var sb = require('sb');

  // console.log('sb:', sb);
  console.log('sb:', sb.require('a'));
`);




function runInThisContext(code, options) {
  return sb.addScript(options.filename, code);
}

// var fn = sb2.addScript('pegjs.js', `
//   // module.exports = 123
//   module.exports = (function(...argv){
//     console.log(12333, argv);
//   });
// `);

fn(3333);

// require = function(...argv) {
//   console.log(argv);
// }

// require(1111)
