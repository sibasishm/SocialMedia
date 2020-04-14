const express = require('express');
const { checkAuthToken } = require('../controllers/auth');
const {
	addComment,
	getAllComments,
	updateComment,
	deleteComment,
	setNestedIds,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(checkAuthToken, setNestedIds, addComment)
	.get(getAllComments);
router.route('/:id').patch(updateComment).delete(deleteComment);

module.exports = router;
