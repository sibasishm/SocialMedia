var ObjectId = require('mongoose').Types.ObjectId;
const Group = require('../models/Group');
const AppError = require('../utils/appError');
const { catchAsync, select } = require('../utils/helper');
const factory = require('./factory');

exports.isGroupFound = factory.isDocumentFound(Group);

exports.isPrivateGroup = (req, res, next) => {
	if (req.document.privateGroup) {
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
	const groupRole = req.document[role];
	if (
		(Array.isArray(groupRole) && !groupRole.includes(req.user._id)) ||
		(ObjectId.isValid(groupRole) && !groupRole.equals(req.user._id))
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
	const group = await Group.findById(req.document._id)
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
		req.document._id,
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
	const group = req.document;

	if (group.members.length === group.maxGroupSize) {
		return next(
			new AppError("This group has reached it's size limit.", 403)
		);
	}

	const userId = req.originalUrl.includes('/join')
		? req.user._id
		: req.body.member;

	if (!userId) {
		return next(new AppError('Please provide a valid user id.', 400));
	}

	isAlreadyJoined = group.members.includes(userId);
	if (isAlreadyJoined) {
		const updatedGroup = await Group.findByIdAndUpdate(
			req.document._id,
			{ $pull: { members: userId } },
			{ new: true }
		);
		return res.status(200).json({
			status: 'success',
			data: updatedGroup,
		});
	}

	group.members.unshift(userId);
	await group.save();

	res.status(200).json({
		status: 'success',
		data: group,
	});
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
	await Group.findByIdAndDelete(req.document._id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
