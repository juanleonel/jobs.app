const { db } = require('../config/db');
const { hashPassword } = require('../utils/hash');
const UserDTO = require('../dto/userDto');

const USER_TABLE = 'user';

/**
 * Gets the specific user by identifier.
 * @param {number} id - The current Id.
 * @returns {Promise<UserDTO>} user found it.
 */
async function getUserById(id) {
  const queryResult = await db(USER_TABLE).select().where({
    'id': id
  });

  if (queryResult.length) {
    return mapUser(queryResult[0])
  }

  return null;
}

/**
 * Gets the specific user by username.
 * @param {string} name - The current username.
 * @returns {Promise<UserDTO>} user found it.
 */
async function getUserByName(name) {
  const queryResult = await db(USER_TABLE).select().where({ 'name': name });

  if (queryResult.length) {
    return mapUser(queryResult[0])
  }

  return null;
}

/**
 * Gets all users.
 * @returns {Promise<Array<UserDTO>>} Array of users as response.
 */
 async function getAllUsers() {
  const queryResult = await db(USER_TABLE).select().where({
    'isActive': true
  });

  if (queryResult.length) {
    return queryResult.map(item => {
      return mapUser(item);
    })
  }

  return [];
}

/**
 * Create a new user data.
 * @param {UserDTO} user - User to will be save.
 * @returns {Promise<UserDTO>} The user object created.
 */
async function addUser(user) {
  const password = await hashPassword(user.password)
  const queryResult = await db(USER_TABLE).insert({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: password
  }).returning(['id, name, lastName, email, password']);

  if (queryResult.length) {
    return mapUser(queryResult[0]);
  }

  return null;
}

/**
 * Create a new instance of user dto.
 * @param {UserDTO} user - User info from db result.
 * @returns {UserDTO} The user object mapped.
 */
function mapUser(data) {
  const user = new UserDTO();
  user.id = data.id;
  user.name = data.name;
  user.lastName = data.lastName;
  user.email = data.email;
  user.password = data.password;
  user.isActive = data.isActive;

  return user;
}

/**
 * Updates the user.
 * @param {UserDTO} user The user will be update.
 */
async function updateUser(user) {
  const userFound = await getUserById(user.id)
  
  if (!userFound) {
    throw Error('User not found')
  }

  let password = userFound.password;

  if (userFound.password !== user.password) {
    password = await hashPassword(user.password)
  }

  db(USER_TABLE)
  .where({ id: user.id })
  .update({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: password
  });
}

module.exports = {
  addUser,
  getUserById,
  getUserByName,
  getAllUsers,
  updateUser
}
