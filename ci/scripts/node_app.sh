#!/bin/bash -xe

cd /usr/src/app
npm install
npm run build
npm run serve &
