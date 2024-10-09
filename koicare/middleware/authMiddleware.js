const { verifyToken } = require('../utils/helper'); 

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token); 

    if (!decoded) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id; 
    next(); 
};

module.exports = {
    verifyToken: verifyTokenMiddleware 
};