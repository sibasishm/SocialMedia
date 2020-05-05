const { uploader, config } = require('cloudinary').v2;

exports.cloudinaryConfig = (req, res, next) => {
	config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
	next();
};

exports.cloudinaryUpload = (file, fileName, tags) =>
	new Promise((resolve, reject) => {
		uploader.upload(
			file,
			{ public_id: `${tags}/${fileName}`, tags },
			(err, result) => {
				if (err) return reject(err);
				return resolve(result);
			}
		);
	});
