#!/usr/bin/env fibjs

const path = require('path');
const Node = require('../');

const argvs = process.argv;
const file = path.join(process.env.PWD, argvs.slice(2));

Node.run(file);
