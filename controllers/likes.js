const Like = require('../models/Like');
const { catchAsync } = require('../utils/helper');
const factory = require('./factory');

// Allow nested routes
exports.setNestedIds = (req, res, next) => {
	if (!req.body.user) req.body.user = req.user._id;
	if (!req.body.post && req.params.postId) req.body.post = req.params.postId;
	if (!req.body.comment && req.params.commentId)
		req.body.comment = req.params.commentId;

	next();
};

exports.addLike = factory.createOne(Like);
exports.deleteLike = factory.deleteOne(Like);

exports.getAllLikes = catchAsync(async (req, res, next) => {
	const likes = await Like.find();

	res.status(200).json({
		status: 'success',
		results: likes.length,
		data: likes,
	});
});
