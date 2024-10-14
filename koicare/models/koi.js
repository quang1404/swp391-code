const db = require('../config/db');

// Get koi by ID
const getKoiById = (id, callback) => {
    const query = `SELECT * FROM Koi WHERE id = ?;`;
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

// Create koi
const createKoi = (name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id, callback) => {
    // Input validation
    if (!name || !image || !body_shape || age <= 0 || size <= 0 || weight <= 0 || !gender || !breed || !origin || selling_price <= 0 || pond_id <= 0) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    if (!['male', 'female'].includes(gender)) {
        return callback(new Error('Invalid gender value. Must be "male" or "female".'), null);
    }

    const query = `
      INSERT INTO Koi (name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    db.query(query, [name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update pond by ID
const updateKoiById = (id, name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id, callback) => {
    
    if (!name || !image || !body_shape || age <= 0 || size <= 0 || weight <= 0 || !gender || !breed || !origin || selling_price <= 0 || pond_id <= 0) {
      return callback(new Error('Invalid input data. Please check all fields.'), null);
    }
    if (!['male', 'female'].includes(gender)) {
      return callback(new Error('Invalid gender value. Must be "male" or "female".'), null);
    }
  
    const query = `UPDATE Koi
    SET name = ?, image = ?, body_shape = ?, age = ?, size = ?, weight = ?, gender = ?, breed = ?, origin = ?, selling_price = ?, pond_id = ?
    WHERE id = ?;`;
    db.query(query, [name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows); 
    });
  };

// Delete pond by ID
const deleteKoiById = (id, callback) => {
    const query = `DELETE FROM Koi WHERE id = ?;`;
    db.query(query, [id], (error, results) => {
      if (error) {
        return callback(error, null); 
      }
      if (results.affectedRows === 0) {
        return callback(new Error('Koi not found.'), null); 
      } else {
        return callback(null, results.affectedRows); 
      }
    });
  };

// Get all koi
const getAllKoi = (callback) => {
    const query = `SELECT * FROM Koi;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

const getKoiWithFoodById = (id, callback) => {
    const query = `
        SELECT 
            k.*,
            ROUND(k.weight * 0.02, 2) AS food_required_kg_per_day 
        FROM 
            Koi k
        WHERE 
            k.id = ?;  
    `;
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

module.exports = {
    getKoiById,
    createKoi,
    updateKoiById,
    deleteKoiById,
    getAllKoi,
    getKoiWithFoodById
};