#!/bin/bash

# retrives the value of a specific tag on an autoscaling group
#
# TAG: the name of the tag whose value to retrieve
# ASG: the name of the autoscaling group
# REGION: the region the auto scaling group resides in
get_tag_value() {
   TAG=$1
   ASG=$2
   REGION=$3
   aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names $ASG --region $REGION --query AutoScalingGroups[].Tags[?Key==\'${TAG}\'].Value --output text
}

# determine the autoscaling group this host belongs to
EC2_REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone | sed -e "s:\([0-9][0-9]*\)[a-z]*\$:\\1:")
INSTANCE_ID=$(curl -sS http://169.254.169.254/latest/meta-data/instance-id)
ASG_NAME=$(aws autoscaling describe-auto-scaling-instances --instance-ids ${INSTANCE_ID} --region ${EC2_REGION} --query AutoScalingInstances[].AutoScalingGroupName --output text)

# retrieving config values from the tags on the autoscaling group
NODEJS_PORT=$(get_tag_value NODEJS_PORT ${ASG_NAME} ${EC2_REGION})
AWS_DYNAMO_REGION=$(get_tag_value AWS_DYNAMO_REGION ${ASG_NAME} ${EC2_REGION})
AWS_SECRET_ACCES_KEY=$(get_tag_value AWS_SECRET_ACCES_KEY ${ASG_NAME} ${EC2_REGION})
AWS_ACCESS_KEY_ID=$(get_tag_value AWS_ACCESS_KEY_ID ${ASG_NAME} ${EC2_REGION})

# set configuration values
export NODEJS_PORT
export AWS_DYNAMO_REGION
export AWS_SECRET_ACCES_KEY
export AWS_ACCESS_KEY_ID

cd /var/nodejs
docker run -e NODEJS_PORT=${NODEJS_PORT}\
    -e AWS_DYNAMO_REGION=${AWS_DYNAMO_REGION}\
    -e AWS_SECRET_ACCES_KEY=${AWS_SECRET_ACCES_KEY}\
    -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}\
    -d -p 80:80 jointly-node