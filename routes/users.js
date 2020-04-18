const express = require('express');
const router = express.Router();

const { signup, login, protect } = require('../controllers/auth');
const { getCurrentUser, getAllUser } = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, getCurrentUser);

router.route('/').get(getAllUser);

module.exports = router;
