const User = require('../models/User');

const AppError = require('../utils/appError');
const { catchAsync, filterObject, select } = require('../utils/helper');
const { cloudinaryUpload } = require('../utils/cloudinaryConfig');
const { multerUpload, dataURI } = require('../utils/multerConfig');

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: 'success',
		results: users.length,
		data: users,
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id).populate({
		path: 'profile',
		select,
	});

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.getMe = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id).populate({
		path: 'profile',
		select,
	});

	res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.uploadImageToServer = multerUpload.single('avatar');

exports.uploadImageToCloudinary = catchAsync(async (req, res, next) => {
	if (!req.file) return next();

	const ext = req.file.mimetype.split('/')[1];
	const filename = `user-${req.user._id}-${Date.now()}.${ext}`;

	const image = dataURI(req).content;

	result = await cloudinaryUpload(image, filename, 'users');

	req.body.avatar = result.secure_url;
	next();
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

	if (req.file) filteredResponse.avatar = req.body.avatar;

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

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
