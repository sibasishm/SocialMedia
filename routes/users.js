const express = require('express');
const router = express.Router();

const { signup, login, protect } = require('../controllers/auth');
const {
	getMe,
	deleteMe,
	updateMe,
	getAllUser,
} = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);

router
	.route('/me')
	.get(protect, getMe)
	.delete(protect, deleteMe)
	.patch(protect, updateMe);

router.route('/').get(getAllUser);

module.exports = router;
