const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please tell us your name']
	},
	lastName: String,
	email: {
		type: String,
		required: [true, 'Please provide your mail'],
		unique: true,
		lowercase: true,
		validate: [
			value => {
				value &&
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
			},
			'Please provide a valid email'
		]
	},
	avatar: String,
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password']
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Users = mongoose.model('user', UserSchema);
