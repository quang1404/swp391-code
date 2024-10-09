const db = require('../config/db'); 

// Get user by ID
const getUserById = (id, callback) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.length > 0) {
            return callback(null, results[0]); 
        } else {
            return callback(null, null); 
        }
    });
};

// Update user by ID
const updateUserById = (id, updatedUserData, callback) => {
    const query = `UPDATE users SET ? WHERE id = ?`;
    db.query(query, [updatedUserData, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

module.exports = {
    getUserById,
    updateUserById
};