const mongoose = require('mongoose');

const uri = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	console.log('MongoDB connection established successfully...');
};

module.exports = connectDB;
