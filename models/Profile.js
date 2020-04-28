const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		unique: true,
	},
	bio: {
		type: String,
		trim: true,
	},
	dob: {
		type: Date,
		required: [true, 'Please provide your date of birth.'],
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
		required: [true, 'Please specify your gender.'],
	},
	location: String,
	nativePlace: String,
	hobbies: [String],
	youtube: String,
	twitter: String,
	facebook: String,
	instagram: String,
	linkedin: String,
	phone: String,
	website: String,
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
