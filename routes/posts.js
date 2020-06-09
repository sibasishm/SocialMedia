const express = require('express');

const commentsRouter = require('../routes/comments');
const reactionsRouter = require('../routes/reactions');

const { protect, restrictTo } = require('../controllers/auth');
const {
	addPost,
	getAllPosts,
	getMyPosts,
	getPost,
	updatePost,
	deletePost,
	isPostFound,
} = require('../controllers/posts');

const router = express.Router();

router.route('/').get(getAllPosts).post(protect, addPost);

router.get('/me', protect, getMyPosts);

router.param('id', isPostFound);

router.use('/:id/comments', commentsRouter);
router.use('/:id/reactions', reactionsRouter);

router
	.route('/:id')
	.get(protect, getPost)
	.delete(protect, restrictTo('self', 'admin'), deletePost)
	.patch(protect, restrictTo('self'), updatePost);

module.exports = router;
