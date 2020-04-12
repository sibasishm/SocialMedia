const Like = require('../models/Like');
const { catchAsync } = require('../utils/helper');

exports.addLike = catchAsync(async (req, res, next) => {
	const newLike = await Like.create(req.body);

	res.status(201).json({
		status: 'success',
		data: newLike,
	});
});

exports.getAllLikes = catchAsync(async (req, res, next) => {
	const likes = await Like.find();

	res.status(200).json({
		status: 'success',
		results: likes.length,
		data: likes,
	});
});
