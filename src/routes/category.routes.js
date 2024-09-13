const express = require('express');
const { getCategoriesController } = require('../controllers/category.controller');
const router = express.Router();

router.get('/categories', getCategoriesController)

module.exports = router;
