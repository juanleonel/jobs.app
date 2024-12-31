const passport = require('passport')
const Strategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const { getUserByName, getUserById } = require('../services/user.service')
const { comparePassword } = require('../utils/hash')
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }

const jwtSecret = process.env.JWT_SECRET || 'mark it zero'
const adminPassword = process.env.ADMIN_PASSWORD || '123'

const authenticate = passport.authenticate('local', { session: false })
passport.use(adminStrategy())

function adminStrategy() {
  return new Strategy(async (username, password, cb) => {
    const isAdmin = username === 'admin' && password === adminPassword
    
    if (isAdmin) {
      return cb(null, { username: 'admin', id: '0' })
    }

    try {
      const user = await getUserByName(username)
  
      if (!user) {
        return cb(null, false)
      }

      const isUser = await comparePassword(password, user.password)

      if (isUser) {
        return cb(null, { username: user.name, id: user.id })
      }
    } catch (error) {
      
    }
    
    return cb(null, false)
  })
}

async function handleUserInfo(userName) {
  try {
    const user = await getUserByName(userName)

    if (!user) {
      return 
    }
  } catch (error) {
    
  }
}

function login(req, res, next) {
  return res.json({ success: true })
}

async function ensureAdmin(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt
  const payload = await verify(jwtString)

  if (payload.username === 'admin') {
    return next()
  }

  const err = new Error('Unauthorized')
  err.statusCode = 401

  return next(err)
}

async function sign(payload) {
  const token = jwt.sign(payload, jwtSecret, jwtOpts)

  return token
}

async function verify(jwtString = '') {
  jwtString = jwtString.replace(/^Bearer /i, '')

  try {
    const payload = jwt.verify(jwtString, jwtSecret)
  
    return payload
  } catch (err) {
    err.statusCode = 401
    throw err
  }
}

async function login(req, res, next) {
  const token = await sign(req.user)
  const userInfo = await getUserById(req.user.id)
  res.cookie('jwt', token, { httpOnly: true })

  return res.json({ success: true, token: token, userInfo: userInfo })
}

module.exports = {
  authenticate,
  ensureAdmin,
  login
}
