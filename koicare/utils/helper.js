const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId },'secret', { expiresIn: 60 * 60 });
};

// Verify JWT token
const verifyToken = (bearerToken) => {
    try {
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        return decoded; 
    } catch (err) {
        return null; 
    }
};

module.exports = {
    generateToken,
    verifyToken
};
