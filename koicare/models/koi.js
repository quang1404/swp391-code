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
const createKoi = (name, image, body_shape, age, size, weight, gender, breed, origin, pond_id, callback) => {

    if (!name || !image || !body_shape || age <= 0 || size <= 0 || weight <= 0 || !gender || !breed || !origin || pond_id <= 0) {
        return callback(new Error('Invalid input data'), null);
    }
    if (!['male', 'female'].includes(gender)) {
        return callback(new Error('Invalid gender value. Must be "male" or "female".'), null);
    }

    const query = `
      INSERT INTO Koi (name, image, body_shape, age, size, weight, gender, breed, origin, pond_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    db.query(query, [name, image, body_shape, age, size, weight, gender, breed, origin, pond_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update pond by ID
const updateKoiById = (id, name, image, body_shape, age, size, weight, gender, breed, origin, pond_id, callback) => {

    if (!name || !image || !body_shape || age <= 0 || size <= 0 || weight <= 0 || !gender || !breed || !origin || pond_id <= 0) {
        return callback(new Error('Invalid input data'), null);
    }
    if (!['male', 'female'].includes(gender)) {
        return callback(new Error('Invalid gender value. Must be "male" or "female".'), null);
    }

    const query = `UPDATE Koi
    SET name = ?, image = ?, body_shape = ?, age = ?, size = ?, weight = ?, gender = ?, breed = ?, origin = ?, pond_id = ?
    WHERE id = ?;`;
    db.query(query, [name, image, body_shape, age, size, weight, gender, breed, origin, pond_id, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete Koi by ID
const deleteKoiById = (id, callback) => {
    db.beginTransaction((err) => {
        if (err) {
            return callback(err, null);
        }
        try {
            const deleteGrowthRecordsQuery = `DELETE FROM Koi_growth_record WHERE koi_id = ?`;
            db.query(deleteGrowthRecordsQuery, [id], (error, deleteResult) => {
                if (error) {
                    throw error;
                }
                const deleteKoiQuery = `DELETE FROM Koi WHERE id = ?`;
                db.query(deleteKoiQuery, [id], (error, koiResult) => {
                    if (error) {
                        throw error;
                    }
                    db.commit((err) => {
                        if (err) {
                            throw err;
                        }
                        callback(null, koiResult.affectedRows);
                    });
                });
            });
        } catch (error) {
            db.rollback(() => {
                console.error('Error deleting koi:', error);
                callback(error, null);
            });
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