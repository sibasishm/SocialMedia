const Reaction = require('../models/Reaction');
const { catchAsync } = require('../utils/helper');

// Allow nested routes
exports.setNestedIds = (req, res, next) => {
	req.body.user = req.user._id;
	req.body.post = req.params.id;
	req.body.comment = req.params.commentId;

	next();
};

exports.updateReaction = catchAsync(async (req, res, next) => {
	const { user, post, comment } = req.body;
	const reactedBefore = await Reaction.findOneAndDelete({
		user,
		post,
		comment,
	});
	if (!reactedBefore) {
		const reaction = await Reaction.create(req.body);

		res.status(201).json({
			status: 'success',
			data: reaction,
		});
	} else {
		res.status(204).json({
			status: 'success',
			data: null,
		});
	}
});

exports.getAllReactions = catchAsync(async (req, res, next) => {
	const filter = req.params.id ? { post: req.params.id } : {};
	const reactions = await Reaction.find(filter);

	res.status(200).json({
		status: 'success',
		results: reactions.length,
		data: reactions,
	});
});
