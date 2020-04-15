const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: [true, 'You can not post empty comments.'],
		trim: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: [true, 'A comment must belong to a user.'],
	},
	post: {
		type: mongoose.Schema.ObjectId,
		ref: 'post',
		required: [true, 'A comment must belong to a post.'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

commentSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'firstName lastName avatar',
	});

	next();
});

module.exports = Comment = mongoose.model('comment', commentSchema);
