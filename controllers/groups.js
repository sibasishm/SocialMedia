const Group = require('../models/Group');
const AppError = require('../utils/appError');
const { catchAsync, filterObject } = require('../utils/helper');

exports.isGroupFound = catchAsync(async (req, res, next, id) => {
	const group = await Group.findById(id);

	if (!group) {
		return next(new AppError('Group not found', 404));
	}

	if (group.privateGroup || group.members.length === group.maxGroupSize) {
		return next(
			new AppError('You are not allowed to join this group', 403)
		);
	}

	next();
});

exports.createGroup = catchAsync(async (req, res, next) => {
	const group = await Group.create(req.body);

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
	const select = '-__v';
	const group = await Group.findById(req.params.id)
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
			new AppError('Please add members using the /join route.', 400)
		);
	}
	const updatedGroup = await Group.findByIdAndUpdate(
		req.params.id,
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

exports.joinGroup = catchAsync(async (req, res, next) => {
	const group = await Group.findById(req.params.id);

	isAlreadyJoined = group.members.includes(req.user._id);
	if (isAlreadyJoined) {
		const updatedGroup = await Group.findByIdAndUpdate(
			req.params.id,
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
	await Group.findByIdAndDelete(req.params.id);

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
