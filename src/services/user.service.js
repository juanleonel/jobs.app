const { db } = require('../config/db');
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
  const queryResult = await db(USER_TABLE).insert({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  }).returning(['id']);

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
  db(USER_TABLE)
  .where({ id: user.id })
  .update({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: user.password
  });
}

module.exports = {
  addUser,
  getUserById,
  getAllUsers,
  updateUser
}
