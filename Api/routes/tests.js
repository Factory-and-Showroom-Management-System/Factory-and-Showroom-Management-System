

const express = require('express');
const testsController = require('../controllers/test.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.get('/associations', testsController.test);


module.exports = router;
