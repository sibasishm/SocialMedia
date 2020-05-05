const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');

const AppError = require('./appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(
			new AppError('Not an image! Please upload images only.', 400),
			false
		);
	}
};

exports.multerUpload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

const parser = new DatauriParser();

exports.dataURI = (req) => {
	return parser.format(
		path.extname(req.file.originalname).toString(),
		req.file.buffer
	);
};
