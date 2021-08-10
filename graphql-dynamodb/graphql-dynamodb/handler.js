'use strict';

const AWS = require('aws-sdk')

function setupDynamoDB() {
  if (!process.env.IS_LOCAL) {
    return new AWS.DynamoDB.DocumentClient()
  }

  const host = process.env.LOCALSTACK_HOSTNAME
  const port = process.env.DYNAMODB_PORT
  console.log('Running local', host, port, `http://${host}:${port}`)
  return new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKeyId: 'DEFAULT_SECRET',
    endpoint: AWS.Endpoint(`http://${host}:${port}`)
  })
}

module.exports.hello = async (event) => {
  const dynamodb = setupDynamoDB()
  const heroes = await dynamodb.scan({
    TableName: process.env.HEROES_TABLE
  }).promise()

  const skills = await dynamodb.scan({
    TableName: process.env.HEROES_TABLE
  }).promise()
  console.log(heroes)
  console.log(skills)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        heroes,
        skills
      },
      null,
      2
    ),
  };
};
