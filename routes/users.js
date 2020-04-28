const express = require('express');
const router = express.Router();

const { signup, login, protect } = require('../controllers/auth');
const {
	getMe,
	deleteMe,
	updateMe,
	getAllUsers,
	getUser,
} = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);

router
	.route('/me')
	.get(protect, getMe)
	.delete(protect, deleteMe)
	.patch(protect, updateMe);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);

module.exports = router;
