const express = require('express');
const router = express.Router();

const { signup, login, checkAuthToken } = require('../controllers/auth');
const { getCurrentUser, getAllUser } = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', checkAuthToken, getCurrentUser);

router.route('/').get(getAllUser);

module.exports = router;
