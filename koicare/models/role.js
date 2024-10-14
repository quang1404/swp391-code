const db = require('../config/db');

// Get role by ID
const getRoleById = (id, callback) => {
    const query = `SELECT * FROM Role WHERE id = ?`;
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

// Update role by ID
const updateRoleById = (id, updatedRoleData, callback) => {
 
    if (!updatedRoleData.name) { 
      return callback(new Error('Invalid input data. Role name is required.'), null);
    }
    const query = `UPDATE Role SET ? WHERE id = ?`;
    db.query(query, [updatedRoleData, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  };

module.exports = {
    getRoleById,
    updateRoleById
};