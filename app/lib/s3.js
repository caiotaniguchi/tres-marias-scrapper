const AWS = require('aws-sdk');

const awsConfig = require('../config/aws.json');

const s3 = new AWS.S3({
  apiVersion: awsConfig.s3.apiVersion,
  region: awsConfig.s3.region
});

const uploadToBucket = async (content, fileName) => {
  const s3params = {
    Bucket: awsConfig.s3.bucket,
    Key: fileName,
    Body: content
  };
  return s3.putObject(s3params).promise();
};

const getAllKeysFromBucket = async (params = {Bucket: awsConfig.s3.bucket},  allKeys = []) => {
  const response = await s3.listObjectsV2(params).promise();
  response.Contents.forEach(obj => allKeys.push(obj.Key));

  if (response.NextContinuationToken) {
    params.ContinuationToken = response.NextContinuationToken;
    await getAllKeys(params, allKeys);
  };
  return allKeys;
};
