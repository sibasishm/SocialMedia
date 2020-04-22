const User = require('../models/User');

const AppError = require('../utils/appError');
const { catchAsync, filterObject } = require('../utils/helper');

exports.getAllUser = catchAsync(async (req, res, next) => {
	const users = await User.find();
	return res.status(200).json({
		status: 'success',
		results: users.length,
		data: users,
	});
});

exports.getMe = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	return res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	const { password, passwordConfirm } = req.body;

	if (password || passwordConfirm) {
		next(
			new AppError(
				'Please update your password using /updateMyPassword route.',
				400
			)
		);
	}

	const filteredResponse = filterObject(
		req.body,
		'firstName',
		'lastName',
		'email'
	);

	const updatedUser = await User.findByIdAndUpdate(
		req.user._id,
		filteredResponse,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		message: 'success',
		data: updatedUser,
	});
});

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user._id, { active: false });
	return res.status(204).json({
		status: 'success',
		data: null,
	});
});