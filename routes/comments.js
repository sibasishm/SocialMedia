const express = require('express');
const { protect } = require('../controllers/auth');
const {
	addComment,
	getAllComments,
	updateComment,
	deleteComment,
	setNestedIds,
} = require('../controllers/comments');

const router = express.Router({ mergeParams: true });

router.route('/').post(protect, setNestedIds, addComment).get(getAllComments);
router.route('/:id').patch(updateComment).delete(deleteComment);

module.exports = router;
