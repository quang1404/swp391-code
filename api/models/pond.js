const db = require('../config/db'); 

// Get pond by ID
const getPondById = (id, callback) => {
    const query = `SELECT * FROM Pond WHERE id = ?;`;
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

// Create pond
const createPond = (id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, callback) => {
    const query = `
        INSERT INTO Pond (id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id)
        VALUES (?, '?', '?', ?, ?, ?, ?, ?, ?);`;
    db.query(query, [name, image, size, depth, volume, num_of_drains, pump_capacity, user_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

// Update pond by ID
const updatePondById = (id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, callback) => {
    const query = `UPDATE Product
    SET name = '?', image = '?', size = ?, depth = ?, volume = ?, num_of_drains = ?, pump_capacity = ?, user_id = ?
    WHERE id = ?;`;
    db.query(query, [name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

// Delete pond by ID
const deletePondById = (id, callback) => {
    const query = `DELETE Product WHERE id = ?;`;
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

module.exports = {
    getPondById,
    createPond,
    updatePondById,
    deletePondById
};