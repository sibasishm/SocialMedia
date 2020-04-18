const express = require('express');

const Post = require('../models/Post');

const commentsRouter = require('../routes/comments');
const reactionsRouter = require('../routes/reactions');

const { protect } = require('../controllers/auth');
const {
	addPost,
	getAllPosts,
	getPost,
	updatePost,
	deletePost,
	isPostFound,
} = require('../controllers/posts');

const router = express.Router();

router.param('postId', isPostFound);

router.use('/:postId/comments', commentsRouter);
router.use('/:postId/reactions', reactionsRouter);

router.route('/').get(getAllPosts).post(protect, addPost);

// @route   GET api/posts/me
// @desc    get logged in user'posts
// @access  Private
router.get('/me', protect, async (req, res) => {
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

router
	.route('/:postId')
	.get(protect, getPost)
	.delete(protect, deletePost)
	.patch(protect, updatePost);

module.exports = router;
