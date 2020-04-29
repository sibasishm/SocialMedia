var ObjectId = require('mongoose').Types.ObjectId;
const Group = require('../models/Group');
const AppError = require('../utils/appError');
const { catchAsync, select } = require('../utils/helper');

exports.isGroupFound = catchAsync(async (req, res, next, id) => {
	const group = await Group.findById(id);

	if (!group) {
		return next(new AppError('Group not found.', 404));
	}
	req.group = group;
	next();
});

exports.isPrivateGroup = (req, res, next) => {
	if (req.group.privateGroup) {
		return next(
			new AppError(
				'This is a private group. You are not allowed to perform this action.',
				403
			)
		);
	}
	next();
};

exports.restrictToGroupRole = (role) => (req, res, next) => {
	console.log(typeof req.group[role]);
	if (
		(Array.isArray(req.group[role]) &&
			!req.group[role].includes(req.user._id)) ||
		(ObjectId.isValid(req.group[role]) &&
			!req.group[role].equals(req.user._id))
	) {
		return next(
			new AppError('You are not allowed to perform this action.', 403)
		);
	}
	next();
};

exports.createGroup = catchAsync(async (req, res, next) => {
	const group = await Group.create({
		...req.body,
		admin: req.user._id,
		members: [req.user._id],
	});

	res.status(201).json({
		status: 'success',
		data: group,
	});
});

exports.getAllGroups = catchAsync(async (req, res, next) => {
	const groups = await Group.find();

	res.status(200).json({
		status: 'success',
		results: groups.length,
		data: groups,
	});
});

exports.getGroup = catchAsync(async (req, res, next) => {
	const group = await Group.findById(req.group._id)
		.populate({ path: 'members', select })
		.populate({ path: 'admin', select });

	res.status(200).json({
		status: 'success',
		data: group,
	});
});

exports.updateGroup = catchAsync(async (req, res, next) => {
	const { members, admin } = req.body;

	if (members || admin) {
		return next(
			new AppError(
				'Please add members using the /addMember or /join route.',
				400
			)
		);
	}
	const updatedGroup = await Group.findByIdAndUpdate(
		req.group._id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: updatedGroup,
	});
});

exports.updateMembers = catchAsync(async (req, res, next) => {
	const group = req.group;

	if (group.members.length === group.maxGroupSize) {
		return next(
			new AppError("This group has reached it's size limit.", 403)
		);
	}

	isAlreadyJoined = group.members.includes(req.user._id);
	if (isAlreadyJoined) {
		const updatedGroup = await Group.findByIdAndUpdate(
			req.group._id,
			{ $pull: { members: req.user._id } },
			{ new: true }
		);
		return res.status(200).json({
			status: 'success',
			data: updatedGroup,
		});
	}

	group.members.unshift(req.user._id);

	await group.save();
	return res.status(200).json({
		status: 'success',
		data: group,
	});
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
	await Group.findByIdAndDelete(req.group._id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
