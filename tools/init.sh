#!/bin/bash

if [ -d node ]; then 
	cd node
  git pull origin master
else
  git clone https://github.com/nodejs/node.git 
fi
