const express = require('express');
const { protect, restricToSelf } = require('../controllers/auth');
const {
	addComment,
	getAllComments,
	updateComment,
	deleteComment,
	setNestedIds,
	checkIfExists,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(protect, setNestedIds, addComment)
	.get(protect, getAllComments);

router.param('id', checkIfExists);

router
	.route('/:id')
	.patch(protect, restricToSelf('comment'), updateComment)
	.delete(protect, restricToSelf('comment'), deleteComment);

module.exports = router;
