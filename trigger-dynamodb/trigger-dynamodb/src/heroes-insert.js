const uuid = require('uuid')
const Joi = require('joi')
const decoratorValidator = require('./utils/decorator-validator')

class HeroesInsert {
  constructor({ dynamoDBService }) {
    this.dynamoDBService = dynamoDBService
    this.dynamoTableName = process.env.DYNAMODB_TABLE
  }
  static validator() {
    return Joi.object({
      name: Joi.string().max(100).min(3).required()
    })
  }
  async insertItem(params) {
    return this.dynamoDBService.put(params).promise()
  }
  prepareData(data) {
    return {
      TableName: this.dynamoTableName,
      Item: {
        ...data,
        id: uuid.v4(),
        createdAt: new Date().toISOString()
      }
    }
  }
  handlerSuccess(data) {
    console.log(data)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  }
  handlerError(data) {
    return {
      statusCode: data.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not insert'
    }
  }
  async main (event) {
    try {
      const data = event.body
      await this.insertItem(this.prepareData(data))
      return this.handlerSuccess(data)

    } catch (e) {
      console.log(e.stack)
      return this.handlerError({ statusCode: 500 })
    }
  }
}
const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const handler = new HeroesInsert({
  dynamoDBService: dynamoDB
})
module.exports = decoratorValidator(handler.main.bind(handler), HeroesInsert.validator(), 'body')
