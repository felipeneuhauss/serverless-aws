const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('../lib/util')
const myRoles = {
  'heroes:list': 'private'
}

const authorizedUser = (userScopes, methodArn) => {
  return userScopes.find((scope) => {
    return ~methodArn.indexOf(myRoles[scope])
  })
}

exports.handler = async (event) => {
  console.log('event', event)
  const token = event.authorizationToken
  console.log('token', token)
  try {
    const decodedUser = jwt.verify(
      token, JWT_KEY
    )
    const userId = decodedUser.user.username

    const isAllowed = authorizedUser(decodedUser.user.scopes, event.methodArn)

    const authorizerContext = {
      user: JSON.stringify(decodedUser.user)
    }
    const policyDocument = buildIAMPolicy(
      userId, isAllowed ? 'Allow' : 'Deny', event.methodArn, authorizerContext
    )

    console.log('policyDocument', policyDocument)
    return policyDocument
  } catch (e) {
    console.log(e.stack)
    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }
}
