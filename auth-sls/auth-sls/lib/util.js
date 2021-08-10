const buildIAMPolicy = (userId, effect, resource, context) => {
  console.log(userId, effect, resource, context)
  const policy = {
    principalId: userId,
    policyDocument: {
      Statement: [{
        Acton: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    },
    context
  }

  return policy
}

module.exports = {
  buildIAMPolicy
}
