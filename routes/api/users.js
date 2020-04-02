const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Users = require('../../models/Users');

// ----------- User Registration -------------
// @route   {POST} /api/users
// @desc    Register User
// @access  Public
// @apiParam {String} [name] User Name
// @apiParam {String} [email] Email
// @apiParam {String} [password] Password
// @apiParam {String} [confirmPassword] Confirm Password
// @apiSuccess (200) {Object} user object with name, email and password
router.post(
	'/',
	[
		check('firstName', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Password needs to be atleast 6 characters long'
		).isLength({ min: 6 })
		// check('confirmPassword').custom((value, { req }) => {
		//     if (value !== req.body.password) {
		//         throw new Error('Please enter the same password');
		//     }
		//     // Indicates the success of this synchronous custom validator
		//     return true;
		// })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Bad request
			return res.status(400).json({ errors: errors.array() });
		}
		const { firstName, lastName, email, password } = req.body;
		try {
			let user = await Users.findOne({ email });
			// Check if user exists
			if (user) {
				return res.status(400).json({
					errors: [{ msg: 'User already exists!' }]
				});
			}
			// Get users gravatar (MAY CHANGE WITH UPLOADED PIC!!)
			const avatar = gravatar.url(email, {
				s: '200', //Default Size
				r: 'pg', //Rating
				d: 'mm' //Default Icon
			});
			user = new Users({
				firstName,
				lastName,
				email,
				avatar,
				password
				// confirmPassword
			});
			// Encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			// user.confirmPassword = await bcrypt.hash(confirmPassword, salt);
			// Save User
			await user.save();
			// Return JWT
			const payload = {
				user: {
					id: user.id //_id of mongoDb
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 }, //Change it to 3600
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
