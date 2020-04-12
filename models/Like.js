const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
		unique: true,
		required: [true, 'A like must belong to a user.'],
	},
	post: {
		type: mongoose.Schema.ObjectId,
		ref: 'post',
		required: function () {
			return this.comment ? false : true;
		},
	},
	comment: {
		type: mongoose.Schema.ObjectId,
		ref: 'comment',
		required: function () {
			return this.post ? false : true;
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

likeSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'firstName lastName avatar',
	});

	next();
});

module.exports = Like = mongoose.model('like', likeSchema);
