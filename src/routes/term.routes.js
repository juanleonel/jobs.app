const express = require('express');
const { getTermsController } = require('../controllers/term.controller');
const router = express.Router();

router.get('/terms', getTermsController)

module.exports = router;
