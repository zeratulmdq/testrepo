#!/bin/bash -xe

cd /usr/src/app
npm install
npm install -g pm2
npm run build
npm run serve &
