'use strict'

const databaseManager = require('./databaseManager')
const { v4 } = require('uuid')

const response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message)
  }
}

module.exports.saveItem = async (event) => {
  const item = JSON.parse(event.body)
  console.log(item)
  item.itemId = v4()

  databaseManager.saveItem(item).then(res => {
    console.log('answer ==>', res)
    return response(200, res)
  })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

module.exports.getItem = async (event) => {
  const itemId = event.pathParameters.itemId
  console.log(itemId)

  databaseManager.getItem(itemId).then(res => {
    console.log(res)
    return response(200, res)
  })
}

module.exports.deleteItem = async (event) => {
  const itemId = event.pathParameters.itemId
  console.log(itemId)

  databaseManager.deleteItem(itemId).then(res => {
    return response(200, 'Deleted.')
  })
}

module.exports.updateItem = async (event) => {
  const itemId = event.pathParameters.itemId
  const body = JSON.parse(event.body)
  const paramsName = body.paramsName
  const paramsValue = body.paramsValue

  console.log(itemId, paramsName, paramsValue)

  databaseManager.updateItem(itemId, paramsName, paramsValue).then(res => {
    console.log(res)
    return response(200, res)
  })
}
