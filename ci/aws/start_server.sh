#!/bin/bash

cd /var/nodejs
docker run -e NODEJS_PORT=${NODEJS_PORT}\
    -e AWS_DYNAMO_REGION=${AWS_DYNAMO_REGION}\
    -e AWS_SECRET_ACCES_KEY=${AWS_SECRET_ACCES_KEY}\
    -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\
    -d -p 80:80 jointly-node