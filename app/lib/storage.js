const AWS = require('aws-sdk');

const s3Driver = require('./s3');

const awsConfig = require('../config/aws.json');

const saveData = data =>
  data
    .map(entry => JSON.stringify(entry))
    .map(entry => s3Driver.uploadToBucket(
      entry, `${awsConfig.s3.bucket}/${entry.dia}.json`)
    );


const getLatestEntryDate = () => {

}
