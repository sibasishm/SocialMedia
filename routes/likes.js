const express = require('express');
const {
	addLike,
	deleteLike,
	getAllLikes,
	setNestedIds,
} = require('../controllers/likes');

const router = express.Router();

router.route('/').post(setNestedIds, addLike).get(getAllLikes);
router.route('/:id').delete(deleteLike);

module.exports = router;
