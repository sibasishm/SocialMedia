const Comment = require('../models/Comment');
const { catchAsync } = require('../utils/helper');
const factory = require('./factory');

// Allow nested routes
exports.setNestedIds = (req, res, next) => {
	req.body.user = req.user._id;
	req.body.post = req.params.id;

	next();
};

exports.isCommentFound = factory.isDocumentFound(Comment);
exports.addComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment, ['text']);
exports.deleteComment = factory.deleteOne(Comment);

exports.getAllComments = catchAsync(async (req, res, next) => {
	const filter = req.params.id ? { post: req.params.id } : {};
	const comments = await Comment.find(filter);

	res.status(200).json({
		status: 'success',
		results: comments.length,
		data: comments,
	});
});
