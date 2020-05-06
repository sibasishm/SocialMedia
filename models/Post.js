const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
		},
		content: {
			type: String,
			required: [true, 'You can not post empty content.'],
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

postSchema.virtual('comments', {
	ref: 'comment',
	foreignField: 'post',
	localField: '_id',
});

postSchema.virtual('reactions', {
	ref: 'reaction',
	foreignField: 'post',
	localField: '_id',
});
module.exports = Post = mongoose.model('post', postSchema);
