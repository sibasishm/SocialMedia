const Profile = require('../models/Profile');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/helper');

exports.doIHaveProfile = catchAsync(async (req, res, next) => {
	const profile = await Profile.findOne({ user: req.user._id });

	if (!profile) {
		return next(new AppError('Profile not found. Please create one.', 404));
	}
	next();
});

exports.createMyProfile = catchAsync(async (req, res, next) => {
	req.body.user = req.user;
	const profile = await Profile.create(req.body);

	return res.status(201).json({
		status: 'success',
		data: profile,
	});
});

exports.getMyProfile = catchAsync(async (req, res, next) => {
	const profile = await Profile.findOne({ user: req.user._id }).populate({
		path: 'user',
		select: 'firstName lastName email avatar',
	});

	return res.status(200).json({
		status: 'succcess',
		data: profile,
	});
});

exports.updateMyProfile = catchAsync(async (req, res, next) => {
	const profile = await Profile.findOneAndUpdate(
		{ user: req.user._id },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	return res.status(200).json({
		status: 'success',
		data: profile,
	});
});
