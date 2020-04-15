const express = require('express');

const { checkAuthToken } = require('../controllers/auth');
const {
	updateReaction,
	getAllReactions,
	setNestedIds,
} = require('../controllers/reactions');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.post(checkAuthToken, setNestedIds, updateReaction)
	.get(getAllReactions);

module.exports = router;
