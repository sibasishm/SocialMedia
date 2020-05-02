const express = require('express');

const commentsRouter = require('../routes/comments');
const reactionsRouter = require('../routes/reactions');

const { protect, restricToSelf } = require('../controllers/auth');
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

router.param('id', isPostFound);

router.use('/:id/comments', commentsRouter);
router.use('/:id/reactions', reactionsRouter);

router.route('/').get(getAllPosts).post(protect, addPost);

router.get('/me', protect, getMyPosts);

router
	.route('/:id')
	.get(protect, getPost)
	.delete(protect, restricToSelf('post'), deletePost)
	.patch(protect, restricToSelf('post'), updatePost);

module.exports = router;
