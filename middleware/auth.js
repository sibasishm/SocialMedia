const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from the request header
    const token = req.header('x-auth-token');

    // Check for token (401: auth error)
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Sending the user object
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
