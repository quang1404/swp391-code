const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h' // hết hạn sau 1h
    });
};

// Verify JWT token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded; 
    } catch (err) {
        return null; 
    }
};

module.exports = {
    generateToken,
    verifyToken
};