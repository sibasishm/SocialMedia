exports.catchAsync = (fn) => (req, res, next, ...rest) => {
	fn(req, res, next, ...rest).catch(next);
};
