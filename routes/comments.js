const express = require('express');
const { protect, restrictTo } = require('../controllers/auth');
const {
	addComment,
	getAllComments,
	updateComment,
	deleteComment,
	setNestedIds,
	isCommentFound,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(protect, setNestedIds, addComment)
	.get(protect, getAllComments);

router.param('id', isCommentFound);

router
	.route('/:id')
	.patch(protect, restrictTo('self'), updateComment)
	.delete(protect, restrictTo('self'), deleteComment);

module.exports = router;
