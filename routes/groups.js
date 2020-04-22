const express = require('express');
const {
	createGroup,
	getAllGroups,
	isGroupFound,
	updateGroup,
	deleteGroup,
	getGroup,
} = require('../controllers/groups');
const { protect, restrictTo } = require('../controllers/auth');

const router = express.Router();

router
	.route('/')
	.post(protect, restrictTo('admin'), createGroup)
	.get(getAllGroups);

router.param('id', isGroupFound);
router
	.route('/:id')
	.get(protect, getGroup)
	.patch(protect, restrictTo('admin'), updateGroup)
	.delete(protect, restrictTo('admin'), deleteGroup);

module.exports = router;
