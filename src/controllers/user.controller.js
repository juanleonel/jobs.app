const { getAllUsers, addUser, getUserById, updateUser } = require('../services/user.service');

/**
 * Handle the request to find the users.
 * @param {Request} req - Request make from client.
 * @param {Response} res - Response for client.
 * @returns {Response}
 */
async function getUsersController(req, res) {
  try {
    const items = await getAllUsers();

    return res.status(200).json({ message: 'ok', item: items });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

/**
 * Handle the request to create the user.
 * @param {Request} req - Request make from client.
 * @param {Response} res - Response for client.
 * @returns {Response}
 */
async function addUserController(req, res) {
  try {
    const item = await addUser(req.body);

    return res.status(202).json({ message: 'ok', item });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

/**
 * Handle the request to update the user.
 * @param {Request} req - Request make from client.
 * @param {Response} res - Response for client.
 * @returns {Response}
 */
async function updateUserController(req, res) {
  try {
    const id = Number(req.params.id);
    const user = req.body;
    user.id = id;
    await updateUser(user);

    return res.status(202).json({
      message: 'ok'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

/**
 * Handle the request to find the user by id.
 * @param {Request} req - Request make from client.
 * @param {Response} res - Response for client.
 * @returns {Response}
 */
async function getUserByIdController(req, res) {
  try {
    const id = Number(req.params.id);
    const item = await getUserById(id);

    return res.status(202).json({ message: 'ok', item });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  getUserByIdController,
  addUserController,
  getUsersController,
  updateUserController
}
