const AppError = require('../utils/appError');
const { catchAsync, filterObject } = require('../utils/helper');

exports.isDocumentFound = (Model) =>
	catchAsync(async (req, res, next, id) => {
		const doc = await Model.findById(id);

		if (!doc) {
			return next(new AppError('Document not found', 404));
		}
		req.document = doc;
		next();
	});

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		await Model.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	});

exports.updateOne = (Model, allowedFields = []) =>
	catchAsync(async (req, res, next) => {
		const filteredResponse =
			allowedFields.length > 0
				? filterObject(req.body, ...allowedFields)
				: req.body;
		const doc = await Model.findByIdAndUpdate(
			req.params.id,
			filteredResponse,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: 'success',
			data: doc,
		});
	});

exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: doc,
		});
	});

exports.getOne = (Model, populateOptions = []) => {
	catchAsync(async (req, res, next) => {
		const query = Model.findById(req.params.id);
		populateOptions.forEach((option) => {
			query.populate(option);
		});

		const doc = await query;

		res.status(200).json({
			status: 'success',
			data: doc,
		});
	});
};
