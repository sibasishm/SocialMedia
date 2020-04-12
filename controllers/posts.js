const Post = require('../models/Post');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/helper');

exports.addPost = catchAsync(async (req, res, next) => {
	const newPost = await Post.create(req.body);

	res.status(201).json({
		status: 'success',
		data: newPost,
	});
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find().sort({ date: -1 });
	res.status(200).json({
		status: 'success',
		results: posts.length,
		data: posts,
	});
});

exports.getPost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.id)
		.populate('likes')
		.populate('comments');

	if (!post) {
		return next(new AppError('Post not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: post,
	});
});
