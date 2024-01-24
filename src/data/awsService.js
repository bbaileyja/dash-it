// src/data/awsService.js
const AWS = require('aws-sdk');

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

const s3 = new AWS.S3();

async function listS3Objects(bucket, prefix) {
  const params = { Bucket: bucket, Prefix: prefix };
  const objects = await s3.listObjectsV2(params).promise();
  return objects.Contents;
}

async function getS3Object(bucket, key) {
  const params = { Bucket: bucket, Key: key };
  const data = await s3.getObject(params).promise();
  return JSON.parse(data.Body.toString());
}

module.exports = { listS3Objects, getS3Object };
