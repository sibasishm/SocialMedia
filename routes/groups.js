const express = require('express');
const {
	createGroup,
	getAllGroups,
	isGroupFound,
	isPrivateGroup,
	updateGroup,
	deleteGroup,
	getGroup,
	updateMembers,
	restrictToGroupRole,
} = require('../controllers/groups');
const { protect } = require('../controllers/auth');

const router = express.Router();

router.route('/').post(protect, createGroup).get(getAllGroups);

router.param('id', isGroupFound);
router
	.route('/:id')
	.get(protect, restrictToGroupRole('members'), getGroup)
	.patch(protect, restrictToGroupRole('admin'), updateGroup)
	.delete(protect, restrictToGroupRole('admin'), deleteGroup);

router.post('/:id/join', protect, isPrivateGroup, updateMembers);
router.post(
	'/:id/addMember',
	protect,
	restrictToGroupRole('admin'),
	updateMembers
);

module.exports = router;
