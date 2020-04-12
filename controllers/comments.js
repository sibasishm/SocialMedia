const Comment = require('../models/Comment');
const { catchAsync } = require('../utils/helper');

exports.addComment = catchAsync(async (req, res, next) => {
	const newComment = await Comment.create(req.body);

	res.status(201).json({
		status: 'success',
		data: newComment,
	});
});

exports.getAllComments = catchAsync(async (req, res, next) => {
	const comments = await Comment.find();

	res.status(200).json({
		status: 'success',
		results: comments.length,
		data: comments,
	});
});
