/**
 * 构造 process 对象
 *   procee 自己的属性
 *   binding 对象
 *   core js 代码初始化到 process.binding('natives') 中静态存储起来
 *   读取 bootstrap_node.js 代码，然后，丢到沙箱中，把 process 传给它执行。
 *   暂时，不考虑沙箱中引用 fibjs native 模块
 */

const path = require('path');
const fs = require('fs');
const vm = require('vm');
const mockGlobal = require('./mockGlobal');

let bootstrap_node = path.join(__dirname, './node/lib/internal/bootstrap_node.js');
bootstrap_node = fs.readFile(bootstrap_node).toString();
bootstrap_node = bootstrap_node.split('\'use strict\';');
bootstrap_node = 'var f = ' + bootstrap_node[1];

const node = new vm.SandBox({}, mockGlobal);

var f = node.addScript('bootstrap_node.js', `
  ${bootstrap_node};
  f(process);
`);


// console.log(f);
