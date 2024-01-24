const jwt = require('jsonwebtoken');

const tokenBlacklist = new Set();

const authenticateUser = async (req, res, next) => {
    const tokenHeader = req.header('Authorization');
    console.log('Token Header:', tokenHeader);

    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        console.log('Unauthorized: Invalid token format');
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    const token = tokenHeader.split(' ')[1];

    // Check if the token is in the blacklist
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Unauthorized: Token revoked' });
    }

    try {
        const decoded = jwt.verify(token, 'password');
        console.log('Decoded:', decoded);

        req.user = decoded;
        console.log('User:', req.user);

        next();
    } catch (err) {
        console.error('Token verification error:', err);
        console.log('Unauthorized: Invalid token');
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = {
    authenticateUser,
    tokenBlacklist
};