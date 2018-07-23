import AWS from "aws-sdk";

const region = process.env.AWS_DYNAMO_REGION
const endpoint = process.env.AWS_DYNAMO_ENDPOINT
const secretAccessKey = process.env.AWS_SECRET_ACCES_KEY
const accessKeyId = process.env.AWS_ACCESS_KEY_ID

AWS.config.update({ region, endpoint, secretAccessKey, accessKeyId });

export default new AWS.DynamoDB.DocumentClient();