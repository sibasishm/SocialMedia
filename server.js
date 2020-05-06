const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
	console.log('Uncaught Exception -- Shutting down server!');
	console.log(err);
	process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
	console.log(`Server started on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
	console.log('Unhandled Rejection -- Shutting down server!');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
