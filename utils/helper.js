exports.catchAsync = (fn) => (req, res, next, ...rest) => {
	fn(req, res, next, ...rest).catch(next);
};

exports.filterObject = (obj, ...allowedKeys) => {
	const filteredObj = {};
	Object.keys(obj).forEach((key) => {
		if (allowedKeys.includes(key)) filteredObj[key] = obj[key];
	});
	return filteredObj;
};
