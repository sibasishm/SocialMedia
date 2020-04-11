const express = require('express');
const router = express.Router();

const { signup, login, checkAuthToken } = require('../controllers/auth');
const { getCurrentUser } = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', checkAuthToken, getCurrentUser);

module.exports = router;
