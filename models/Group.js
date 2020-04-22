const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxlength: [30, 'A group name can not be more than 30 characters.'],
		minlength: [10, 'A group name can not be less than 10 characters.'],
	},
	maxGroupSize: {
		type: Number,
		default: 6,
	},
	description: {
		type: String,
		trim: true,
	},
	coverImage: String,
	privateGroup: {
		type: Boolean,
		default: true,
	},
	members: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'user',
		},
	],
	admin: {
		type: mongoose.Schema.ObjectId,
		ref: 'user',
	},
	date: {
		type: Date,
		default: Date.now(),
		select: false,
	},
});

module.exports = Group = mongoose.model('group', groupSchema);
