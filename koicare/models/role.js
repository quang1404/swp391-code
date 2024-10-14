const db = require('../config/db');

// Get all roles
const getAllRoles = (callback) => {
  const query = `SELECT * FROM Role;`;
  db.query(query, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

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

// Create a new role
const createRole = (name, callback) => {
  if (!name) {
    return callback(new Error('Role name is required.'), null);
  }

  const query = `INSERT INTO Role (name) VALUES (?)`;
  db.query(query, [name], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
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

// Delete role by ID
const deleteRoleById = (id, callback) => {
  const query = `DELETE FROM Role WHERE id = ?`;
  db.query(query, [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.affectedRows);
  });
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRoleById,
  deleteRoleById
};