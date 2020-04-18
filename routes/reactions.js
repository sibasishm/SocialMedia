const express = require('express');

const { protect } = require('../controllers/auth');
const {
	updateReaction,
	getAllReactions,
	setNestedIds,
} = require('../controllers/reactions');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(protect, setNestedIds, updateReaction)
	.get(getAllReactions);

module.exports = router;
