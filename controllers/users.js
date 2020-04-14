const User = require('../models/User');

const { catchAsync } = require('../utils/helper');

exports.getCurrentUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	return res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.getAllUser = catchAsync(async (req, res, next) => {
	const users = await User.find();
	return res.status(200).json({
		status: 'success',
		results: users.length,
		data: users,
	});
});
