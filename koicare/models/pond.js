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
            return callback(null,
                null);
        }
    });
};

// Create pond
const createPond = (id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, callback) => {
    const query = `
        INSERT INTO Pond (id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id)
        VALUES (?, '?', '?', ?, ?, ?, ?, ?, ?);`;
    db.query(query, [id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update pond by ID
const updatePondById = (id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, callback) => {
    const query = `UPDATE Pond  
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
    const query = `DELETE FROM Pond WHERE id = ?;`;
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Get all pond
const getAllPonds = (callback) => {
    const query = `SELECT * FROM Pond;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

// Calculate salt amount for a pond
const getPondDetails = (pondId, callback) => {
    const query = `
      SELECT 
        p.id AS pond_id,
        p.name AS pond_name,
        COUNT(k.id) AS koi_count,  
        ROUND(p.volume * 0.003, 2) AS salt_kg_required //3% dung tích hồ
      FROM 
        Pond p
      LEFT JOIN 
        Koi k ON p.id = k.pond_id
      WHERE 
        p.id = ? 
      GROUP BY 
        p.id, p.name;
    `;
    db.query(query, [pondId], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null,
                null);
        }
    });
};


module.exports = {
    getPondById,
    createPond,
    updatePondById,
    deletePondById,
    getAllPonds,
    getPondDetails
};