const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Post');

// --------- Create and update profiles --------------
// @route POST /api/profiles
// @desc Create or update an user profile
// @access Private
router.post('/', auth, async (req, res) => {
	// Build the profileObj
	let profileObj = {};
	profileObj.favourites = {};
	profileObj.contact = {};
	profileObj.social = {};

	// Get the id from x-auth-token set in req.user in auth middleware
	profileObj.user = req.user.id;

	const profileKeywords = [
		'bio',
		'dob',
		'gender',
		'location',
		'topics',
		'hobbies',
		'youtube',
		'twitter',
		'facebook',
		'instagram',
		'linkedin',
		'phone',
		'website'
	];

	// Check if the fields are filled then init them in profileObj
	profileKeywords.forEach(keyword => {
		if (req.body.hasOwnProperty(keyword) && req.body[keyword]) {
			profileObj[keyword] = req.body[keyword];
		}
		return;
	});

	try {
		let profile = await Profile.findOne({ user: req.user.id });

		// If profile already exists then update it
		if (profile) {
			profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileObj },
				{ new: true }
			);

			return res.json(profile);
		}

		// Create and save a new profile
		profile = new Profile(profileObj);

		await profile.save();
		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// --------- Get all profiles --------------
// @route   GET /api/profiles
// @desc    Show all profiles
// @access  Public

router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', [
			'firstName',
			'lastName',
			'avatar'
		]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// --------- Get specific profile when clicked from all profiles page --------------
// @route   GET /api/profiles/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
	try {
		// user_id will come from URL (req.param)
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate('user', ['firstName', 'lastName', 'avatar']);

		// Check if the profile exists
		if (!profile) {
			return res.status(404).json({ msg: 'Profile does not exist' });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		// in case of invalid object_id show profile not found
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Profile does not exist' });
		}
		res.status(500).send('Server Error');
	}
});

// --------- Delete profile and corresponding user --------------
// @route   DELETE /api/profiles
// @desc    Delete profile,user and his posts
// @access  Private

router.delete('/', auth, async (req, res) => {
	try {
		// Remove users posts
		await Post.deleteMany({ user: req.user.id });

		// Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });

		// Remove user
		await User.findByIdAndRemove({ _id: req.user.id });

		res.json({ msg: 'User removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// -------- Follow an user ----------
// @route /api/follow/:user_id
// @desc follow an user (if you follow and already following user, you will unfollow him)
// @access Private
router.put('/follow/:profile_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findById(req.params.profile_id);

		if (!profile) {
			return res.status(404).json({ msg: 'Profile not found!' });
		}

		const existingFollowers = profile.followers.filter(
			follower => follower.user.toString() === req.user.id
		);

		if (existingFollowers.length === 1) {
			const updatedProfile = await Profile.findOneAndUpdate(
				{ _id: req.params.profile_id },
				{ $pull: { followers: { user: existingFollowers[0].user } } },
				{ new: true }
			);
			return res.json(updatedProfile.followers);
		}

		profile.followers.unshift({ user: req.user.id });

		await profile.save();
		res.json(profile.followers);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Profile not found!' });
		}
		res.status(500).send('Server Error');
	}
});

// --------- Add profile experience --------------
// @route   PUT /api/profiles/experience
// @desc    Add profile experience
// @access  Private

router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required')
				.not()
				.isEmpty(),
			check('company', 'Company is required')
				.not()
				.isEmpty(),
			check('from', 'From date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, from, to, isCurrent, description } = req.body;

		const newExperience = {
			title,
			company,
			from,
			to,
			isCurrent,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExperience);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// --------- DELETE profile experience --------------
// @route   DELETE /api/profiles/experience/:exp_id
// @desc    Delete a particular experince from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		// remove the experince from the array of experince with the given exp_id from URL
		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $pull: { experience: { _id: req.params.exp_id } } },
			{ new: true } // to return the updated profile (rather than the original one)
		);

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// --------- Add profile education --------------
// @route   PUT /api/profiles/education
// @desc    Add profile education
// @access  Private

router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required')
				.not()
				.isEmpty(),
			check('fieldOfStudy', 'Field of study is required')
				.not()
				.isEmpty(),
			check('from', 'From date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			school,
			degree,
			fieldOfStudy,
			from,
			to,
			isCurrent,
			description
		} = req.body;

		const newEducation = {
			school,
			degree,
			fieldOfStudy,
			from,
			to,
			isCurrent,
			description
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(newEducation);
			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// --------- DELETE profile education --------------
// @route   DELETE /api/profiles/education/:edu_id
// @desc    Delete a particular education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		// remove the education from the array of education with the given exp_id from URL
		const profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $pull: { education: { _id: req.params.edu_id } } },
			{ new: true } // to return the updated profile (rather than the original one)
		);

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
