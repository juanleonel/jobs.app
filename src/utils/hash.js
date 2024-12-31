const bcrypt = require('bcrypt')

const SALT = 10

async function hashPassword (password) {
  return await bcrypt.hash(password, SALT)
}

async function comparePassword(password, toPassword) {
  return await bcrypt.compare(password, toPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}
