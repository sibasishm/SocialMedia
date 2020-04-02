const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/Users');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
	'/',
	[
		auth,
		[
			check('text', "You can't create empty posts")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return res.status(400).json({ errors: error.array() });
			}

			const user = await User.findById(req.user.id).select('-password');

			const newPost = {
				text: req.body.text,
				name: user.firstName,
				avatar: user.avatar,
				user: req.user.id
			};

			// Create and save a new post
			const post = new Post(newPost);
			await post.save();
			res.json(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   GET api/posts
// @desc    get all posts
// @access  Public
router.get('/', async (req, res) => {
	try {
		// Show newest posts first
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/posts/me
// @desc    get logged in user'posts
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		// Show newest posts first
		const posts = await Post.find({
			user: req.user.id
		}).sort({ date: -1 });

		if (!posts) {
			return res
				.status(404)
				.json({ msg: 'There are no posts for this user' });
		}

		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route   GET api/posts/:post_id
// @desc    get specific post by id
// @access  Private (Logged in users can only view)
router.get('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		if (!post) {
			return res.status(404).json({ msg: 'Post not found!' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);
		// in case of invalid objectId show post not found
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found!' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/posts/:post_id
// @desc    delete a post
// @access  Private (Logged in users can only view)
router.delete('/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		// Posts existance
		if (!post) {
			return res.status(404).json({ msg: 'Post not found!' });
		}

		// check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).send({ msg: 'User not authorized' });
		}

		await post.remove();

		res.json({ msg: 'Post removed' });
	} catch (err) {
		console.error(err.message);
		// in case of invalid objectId show post not found
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found!' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/posts/like/:post_id
// @desc    like/unlike a post (If you try to like a post you have already liked, you will unlike it)
// @access  Private (Logged in users can only view)
router.put('/like/:post_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		// Posts existance
		if (!post) {
			return res.status(404).json({ msg: 'Post not found!' });
		}

		// Check if the post has already been liked by the user
		// LOGIC
		// 1. Loop through likes of the current post
		// 2. Check it contains the user id of the logged in user
		// If true remove the user from likes array else add

		const likedUserObjectArray = post.likes.filter(
			like => like.user.toString() === req.user.id
		);

		// Since the likes are unique there will always be one entry in the likedUserObjectArray
		if (likedUserObjectArray.length === 1) {
			// remove the user from the array of likes with the given post_id from URL
			const updatedPost = await Post.findOneAndUpdate(
				{ _id: req.params.post_id },
				{ $pull: { likes: { user: likedUserObjectArray[0].user } } },
				{ new: true } // to return the updated post (rather than the original one)
			);
			return res.json(updatedPost.likes);
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		// in case of invalid objectId show post not found
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found!' });
		}
		res.status(500).send('Server Error');
	}
});

// @route   PUT api/posts/comments/:post_id
// @desc    add a comment to a post
// @access  Private (Logged in users can only view)
router.post(
	'/comments/:post_id',
	[
		auth,
		[
			check('text', "You can't post empty comments")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return res.status(400).json({ errors: error.array() });
			}

			const user = await User.findById(req.user.id).select('-password');

			const post = await Post.findById(req.params.post_id);

			// Posts existance
			if (!post) {
				return res.status(404).json({ msg: 'Post not found!' });
			}

			const comment = {
				text: req.body.text,
				name: user.firstName,
				avatar: user.avatar,
				user: req.user.id
			};
			post.comments.push(comment);

			await post.save();
			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			// in case of invalid objectId show post not found
			if (err.kind == 'ObjectId') {
				return res.status(404).json({ msg: 'Post not found!' });
			}
			res.status(500).send('Server Error');
		}
	}
);

// --------- DELETE comment --------------
// @route   DELETE /api/posts/comments/:post_id/:comment_id
// @desc    Delete a particular comment from post
// @access  Private

router.delete('/comments/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id);

		// Posts existance
		if (!post) {
			return res.status(404).json({ msg: 'Post not found!' });
		}

		// Pull out the comment
		const comment = post.comments.find(
			comment => comment.id === req.params.comment_id
		);

		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}

		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({
				msg: 'You are not authorized to delete the comment'
			});
		}

		const removeIndex = post.comments
			.map(comment => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removeIndex, 1);

		await post.save();
		return res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		// in case of invalid objectId show post not found
		if (err.kind == 'ObjectId') {
			return res.status(404).json({ msg: 'Post not found!' });
		}
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
