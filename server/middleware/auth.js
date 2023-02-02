const jwt = require('jsonwebtoken')
const ENV = require('../config.js')

async function Auth(req, res, next) {
  try {
    // pour récupérer le token après le "Bearer"
    const token = req.headers.authorization.split(' ')[1]

    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)

    req.user = decodedToken

    next()
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' })
  }
}

async function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  }
  next()
}
module.exports = { Auth, localVariables }
