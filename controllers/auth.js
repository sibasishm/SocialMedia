const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/helper');

const signToken = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

exports.protect = catchAsync(async (req, res, next) => {
	// Get token from the request header
	let token;
	const auth = req.headers.authorization;
	if (auth && auth.startsWith('Bearer')) {
		token = auth.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Please login to get access.', 401));
	}

	// Verify token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// Check if user still exists
	const user = await User.findById(decoded.id);
	if (!user) {
		return next(
			new AppError(
				'The user no longer exists. Please sign up again.',
				401
			)
		);
	}

	// Check if the password is changed after token is generated
	if (user.isPasswordChangedAfter(decoded.iat)) {
		return next(
			new AppError(
				`You've recently changed your password. Please login again.`,
				401
			)
		);
	}

	req.user = user;
	next();
});

exports.signup = catchAsync(async (req, res, next) => {
	const { firstName, lastName, email, password, passwordConfirm } = req.body;
	const newUser = await User.create({
		firstName,
		lastName,
		email,
		password,
		passwordConfirm,
	});

	const token = signToken(newUser._id);

	res.status(201).json({
		status: 'success',
		token,
		data: newUser,
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Please provide email and password.', 400));
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.checkPassword(password, user.password))) {
		return next(new AppError('Please provide correct credentials.', 401));
	}

	res.status(200).json({
		status: 'success',
		token: signToken(user._id),
	});
});
