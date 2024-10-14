const db = require('../config/db');

// Create user 
const createUser = (userData, callback) => {
    const { name, email, password, password_confirm, role_id } = userData;
    if (!name || !email || !password || password !== password_confirm) {
        return callback(new Error('Invalid input data'), null);
    }

    const query = `INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, password, role_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

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

// Get user by email (used for login)
const getUserByEmail = (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], (error, results) => {
        if (error) {
            return callback(error,null);
        }
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null,null);
        }
    });
};

const updateUserById = (id, updatedUserData, callback) => {
    if (updatedUserData.name && updatedUserData.name.length === 0) {
      return callback(new Error('Name cannot be empty'), null);
    }
    if (updatedUserData.email && !isValidEmail(updatedUserData.email)) {
      return callback(new Error('Invalid email format'), null);
    }
    const query = `UPDATE users SET ? WHERE id = ?`;
    db.query(query, [updatedUserData, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  };

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  module.exports = {
    getUserById,
    getUserByEmail, 
    createUser, 
    updateUserById
  };