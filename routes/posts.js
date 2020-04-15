const express = require('express');

const Post = require('../models/Post');

const commentsRouter = require('../routes/comments');
const reactionsRouter = require('../routes/reactions');

const { checkAuthToken } = require('../controllers/auth');
const {
	addPost,
	getAllPosts,
	getPost,
	isPostFound,
} = require('../controllers/posts');

const router = express.Router();

router.param('postId', isPostFound);

router.use('/:postId/comments', commentsRouter);
router.use('/:postId/reactions', reactionsRouter);

router.route('/').get(getAllPosts).post(checkAuthToken, addPost);

// @route   GET api/posts/me
// @desc    get logged in user'posts
// @access  Private
router.get('/me', checkAuthToken, async (req, res) => {
	try {
		// Show newest posts first
		const posts = await Post.find({
			user: req.user.id,
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

router.get('/:postId', checkAuthToken, getPost);

// @route   DELETE api/posts/:post_id
// @desc    delete a post
// @access  Private (Logged in users can only view)
router.delete('/:post_id', checkAuthToken, async (req, res) => {
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
router.put('/like/:post_id', checkAuthToken, async (req, res) => {
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
			(like) => like.user.toString() === req.user.id
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

// --------- DELETE comment --------------
// @route   DELETE /api/posts/comments/:post_id/:comment_id
// @desc    Delete a particular comment from post
// @access  Private

router.delete(
	'/comments/:post_id/:comment_id',
	checkAuthToken,
	async (req, res) => {
		try {
			const post = await Post.findById(req.params.post_id);

			// Posts existance
			if (!post) {
				return res.status(404).json({ msg: 'Post not found!' });
			}

			// Pull out the comment
			const comment = post.comments.find(
				(comment) => comment.id === req.params.comment_id
			);

			// Make sure comment exists
			if (!comment) {
				return res.status(404).json({ msg: 'Comment does not exist' });
			}

			// Check user
			if (comment.user.toString() !== req.user.id) {
				return res.status(401).json({
					msg: 'You are not authorized to delete the comment',
				});
			}

			const removeIndex = post.comments
				.map((comment) => comment.user.toString())
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
	}
);

module.exports = router;
