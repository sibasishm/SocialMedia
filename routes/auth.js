const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/Users');
const { checkAuthToken } = require('../controllers/auth');

// ----------- User Fetching by token -------------
// @route   GET api/auth
// @desc    Get users data (except password) from token
// @access  Public (Protected with auth middleware)
router.get('/', checkAuthToken, async (req, res) => {
	try {
		// get user data from it's id (sent from token) but not the password
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ msg: 'Server Error' });
	}
});

// ----------- User Login -------------
// @route   {POST} /api/auth
// @desc    Authenticate User and get token
// @access  Public
// @apiParam {String} [email] Email
// @apiParam {String} [password] Password
// @apiSuccess (200) {Object} user object with name and password
router.post(
	'/',
	[
		check('email', 'Please enter your email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Bad request
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		try {
			let user = await Users.findOne({ email });
			// Check if user doesn't exist
			if (!user) {
				return res.status(400).json({
					errors: [{ msg: 'Invalid credentials' }],
				});
			}
			// Match password (entered password and the encrypted password)
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({
					errors: [{ msg: 'Invalid credentials' }],
				});
			}
			// Return JWT
			const payload = {
				user: {
					id: user.id, //_id of mongoDb
				},
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
