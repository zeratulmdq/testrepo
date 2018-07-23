#!/bin/bash -xe

apt-get update -y
apt-get install -y curl libcurl3 libcurl3-dev ngrep gnupg lsof
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
apt-get install -y build-essential