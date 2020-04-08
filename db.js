const mongoose = require('mongoose');

const uri = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB Connection established successfully...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
