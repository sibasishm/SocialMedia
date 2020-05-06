const Post = require('../models/Post');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/helper');
const factory = require('./factory');

exports.isPostFound = factory.isDocumentFound(Post);

exports.addPost = catchAsync(async (req, res, next) => {
	const doc = await Post.create({ ...req.body, user: req.user._id });

	res.status(201).json({
		status: 'success',
		data: doc,
	});
});
exports.deletePost = factory.deleteOne(Post);
exports.updatePost = factory.updateOne(Post, ['content']);

exports.getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find().sort({ date: -1 });
	res.status(200).json({
		status: 'success',
		results: posts.length,
		data: posts,
	});
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ user: req.user._id }).sort({ date: -1 });
	res.status(200).json({
		status: 'success',
		results: posts.length,
		data: posts,
	});
});

exports.getPost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.id)
		.populate('user')
		.populate('reactions')
		.populate('comments');

	res.status(200).json({
		status: 'success',
		data: post,
	});
});
