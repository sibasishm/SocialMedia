const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	bio: {
		type: String
	},
	dob: {
		type: Date,
		default: new Date()
	},
	gender: {
		type: String
	},
	location: {
		type: String
	},
	hobbies: {
		type: [String]
	},
	youtube: {
		type: String
	},
	twitter: {
		type: String
	},
	facebook: {
		type: String
	},
	instagram: {
		type: String
	},
	linkedin: {
		type: String
	},
	phone: {
		type: String
	},
	website: {
		type: String
	},
	followers: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	education: [
		{
			school: {
				type: String,
				required: true
			},
			degree: {
				type: String
			},
			fieldOfStudy: {
				type: String,
				required: true
			},
			from: {
				type: Date,
				required: true
			},
			to: {
				type: Date
			},
			isCurrent: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	experience: [
		{
			title: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true
			},
			from: {
				type: Date,
				required: true
			},
			to: {
				type: Date
			},
			isCurrent: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
