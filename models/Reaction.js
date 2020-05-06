const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['like', 'love', 'angry'],
		default: 'like',
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		required: [true, 'A reaction must belong to a user.'],
	},
	post: {
		type: mongoose.Schema.ObjectId,
		ref: 'post',
		required: [true, 'A reaction must belong to a post or comment'],
	},
	comment: {
		type: mongoose.Schema.ObjectId,
		ref: 'comment',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

reactionSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'firstName lastName avatar',
	});

	next();
});

module.exports = Like = mongoose.model('reaction', reactionSchema);
