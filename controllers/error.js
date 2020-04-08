module.exports = (err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		status: err.status || 500,
		message: err.message
	});
};
