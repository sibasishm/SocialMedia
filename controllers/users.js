const User = require('../models/User');

const { catchAsync } = require('../utils/helper');

exports.getCurrentUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	return res.status(200).json({
		status: 'success',
		data: user,
	});
});
