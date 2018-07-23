import '../env';

import AWS from "aws-sdk";
import fs from 'fs';
import uuid from 'uuid/v1';

// import userData from './userData.json';

const region = process.env.AWS_DYNAMO_REGION
const endpoint = process.env.AWS_DYNAMO_ENDPOINT
const secretAccessKey = process.env.AWS_SECRET_ACCES_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID

AWS.config.update({ region, endpoint, secretAccessKey, accessKeyId });

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: "Users",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },  // Partition key. No sort key.
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        console.log("Importing users into DynamoDB. Please wait.");
        const allUsers = JSON.parse(fs.readFileSync(__dirname + '/userData.json', 'utf8'));

        allUsers.forEach(user => {
            const params = {
                TableName: "Users",
                Item: {
                    "id": uuid(),
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "emails": user.emails
                }
            };

            docClient.put(params, (err, data) => {
                if (err) {
                    console.error("Unable to add user", user.firstName, user.lastName, ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("PutItem succeeded:", user.firstName, user.lastName);
                }
            });
        });

    }
});