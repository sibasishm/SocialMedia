const AppError = require('../utils/appError');

const handleCastErrorInDB = (err) =>
	new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateErrorInDB = (err) => {
	const value = Object.values(err.keyValue)[0];
	const key = Object.keys(err.keyValue)[0];
	return new AppError(
		`${value} is already taken. Please use another ${key}.`,
		400
	);
};

const handleValidationErrorInDB = (err) => {
	const errors = Object.values(err.errors).map((item) => item.message);
	return new AppError(`Invalid input data. ${errors.join('. ')}`, 400);
};

const handleJWTError = () =>
	new AppError(`Invalid token. Please login again.`, 401);

const handleJWTExpiredError = () =>
	new AppError(`Your token has expired. Please login again.`, 401);

const sendDevError = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendProdError = (err, res) => {
	// All the errors we create are operational.
	// For the rest of unknown errors send a generic message
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		// Check heroku logs
		console.error('ERROR!', err);
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong!',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendDevError(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		if (error.name === 'CastError') error = handleCastErrorInDB(error);
		if (error.code === 11000) error = handleDuplicateErrorInDB(error);
		if (error.name === 'ValidationError')
			error = handleValidationErrorInDB(error);
		if (error.name === 'JsonWebTokenError') error = handleJWTError();
		if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

		sendProdError(error, res);
	}
};
