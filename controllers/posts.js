const Post = require('../models/Post');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/helper');
const factory = require('./factory');

exports.isPostFound = catchAsync(async (req, res, next, id) => {
	const post = await Post.findById(id);

	if (!post) {
		return next(new AppError('Post not found', 404));
	}
	next();
});

exports.addPost = factory.createOne(Post);
exports.deletePost = factory.deleteOne(Post);
exports.updatePost = factory.updateOne(Post);

exports.getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find().sort({ date: -1 });
	res.status(200).json({
		status: 'success',
		results: posts.length,
		data: posts,
	});
});

exports.getPost = catchAsync(async (req, res, next) => {
	const post = await Post.findById(req.params.postId)
		.populate('reactions')
		.populate('comments');

	res.status(200).json({
		status: 'success',
		data: post,
	});
});
