const express = require('express');
const {
  getUsersController,
  addUserController,
  getUserByIdController,
  updateUserController
} = require('../controllers/user.controller');
const router = express.Router();

router.get('/users', getUsersController);
router.post('/users', addUserController);
router.get('/users/:id', getUserByIdController);
router.put('/users/:id', updateUserController);

module.exports = router;
