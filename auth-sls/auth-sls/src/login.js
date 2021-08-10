const users = require('../db/users.json')
const JWT_KEY = process.env.JWT_KEY
const { sign } = require('jsonwebtoken')

const login = async (event) => {
  console.log('Login invoke...', event.body)

  const { username, password } = JSON.parse(event.body)

  const validUser = users.find((user) => {
    return user.username.toLowerCase() === username.toLowerCase() &&
      user.password === password
  })

  if (!validUser) {
    return { statusCode: 401, body: JSON.stringify({
        message: 'unauthorized'
      })
    }
  }

  const signUser = {
    scopes: validUser.scopes,
    username: validUser.username
  }

  const token = sign(
    {
      user: signUser
    }, JWT_KEY, { expiresIn: '5m' }
  )

  return {
    statusCode: 200,
    body: JSON.stringify({
      token
    })
  }
}

exports.handler = login
