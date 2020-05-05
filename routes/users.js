const express = require('express');
const router = express.Router();

const { signup, login, protect } = require('../controllers/auth');
const {
	getMe,
	deleteMe,
	updateMe,
	updateAvatar,
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

router.patch('/updateAvatar', protect, updateAvatar);

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;
