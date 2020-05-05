const multer = require('multer');

const User = require('../models/User');

const AppError = require('../utils/appError');
const { catchAsync, filterObject, select } = require('../utils/helper');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'img/');
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(
			new AppError('Not an image! Please upload images only.', 400),
			false
		);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

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

exports.updateAvatar = (req, res, next) => {
	upload.single('avatar')(req, res, function (err) {
		if (!req.file) {
			return next(
				new AppError('Not an image! Please upload images only.', 400)
			);
		}
		if (err) {
			return next(
				new AppError(
					'Some error occured while uploading the image. Please try again.',
					400
				)
			);
		}
		const cloudinary = require('cloudinary').v2;

		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		const path = req.file.path;
		const filename = req.file.filename;

		cloudinary.uploader.upload(
			path,
			{ public_id: `users/${filename}`, tags: 'users' },
			async function (err, image) {
				if (err) {
					return next(
						new AppError(
							'Some error occured while uploading the image. Please try again.',
							400
						)
					);
				}
				// remove file from server
				const fs = require('fs');
				fs.unlinkSync(path);

				const updatedUser = await User.findByIdAndUpdate(
					req.user._id,
					{ avatar: image.secure_url },
					{
						new: true,
						runValidators: true,
					}
				);

				res.status(200).json({
					message: 'success',
					data: updatedUser,
				});
			}
		);
	});
};

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

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
