const mongoose = require('mongoose');
const config = require('config');

const uri = config.get('mongoURI');

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
		// exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
