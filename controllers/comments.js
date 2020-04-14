const Comment = require('../models/Comment');
const { catchAsync } = require('../utils/helper');
const factory = require('./factory');

// Allow nested routes
exports.setNestedIds = (req, res, next) => {
	req.body.user = req.user._id;
	// if postId is not specified in body then take it from params
	if (!req.body.post) req.body.post = req.params.postId;

	next();
};

exports.addComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);

exports.getAllComments = catchAsync(async (req, res, next) => {
	const filter = req.params.postId ? { post: req.params.postId } : {};
	const comments = await Comment.find(filter);

	res.status(200).json({
		status: 'success',
		results: comments.length,
		data: comments,
	});
});
