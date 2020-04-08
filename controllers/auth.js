const jwt = require('jsonwebtoken');

const User = require('../models/Users');

exports.checkAuthToken = (req, res, next) => {
	// Get token from the request header
	const token = req.header('x-auth-token');

	// Check for token (401: auth error)
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Sending the user object
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};

exports.signup = async (req, res, next) => {
	const newUser = await User.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			user: newUser
		}
	});
};
