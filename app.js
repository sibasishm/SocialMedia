const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profiles');
const postRouter = require('./routes/posts');

const app = express();
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/posts', postRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
