const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please tell us your name'],
		},
		lastName: String,
		email: {
			type: String,
			required: [true, 'Please provide your mail'],
			unique: true,
			lowercase: true,
			validate: {
				validator: function (value) {
					return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
						value
					);
				},
				message: 'Please provide a valid email',
			},
		},
		avatar: {
			type: String,
			default: process.env.DEFAULT_AVATAR,
		},
		role: {
			type: String,
			enum: ['user', 'admin', 'group-member'],
			default: 'user',
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minlength: 8,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			validate: {
				validator: function (value) {
					return value === this.password;
				},
				message: 'Please enter the same password',
			},
		},
		passwordChangedAt: Date,
		active: {
			type: Boolean,
			default: true,
			select: false,
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

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

userSchema.virtual('profile', {
	ref: 'profile',
	foreignField: 'user',
	localField: '_id',
});

userSchema.methods.checkPassword = async function (
	testPassword,
	actualPassword
) {
	return await bcrypt.compare(testPassword, actualPassword);
};

userSchema.methods.isPasswordChangedAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		return JWTTimestamp < changedTimestamp;
	}
	return false;
};

module.exports = Users = mongoose.model('user', userSchema);
