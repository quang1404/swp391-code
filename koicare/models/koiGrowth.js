const db = require('../config/db'); 

// Get koi growth record by ID
const getKoiGrowthById = (id, callback) => {
    const query = `SELECT * FROM Koi_growth_record WHERE id = ?`; 
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

// Update koi growth record by ID
const updateKoiGrowthById = (id, updateKoiGrowthData, callback) => {
    
    const { growth_date, age, size, weight } = updateKoiGrowthData;
    if (!growth_date || age <= 0 || size <= 0 || weight <= 0) {
        return callback(new Error('Invalid input data'), null);
    }

    const query = `UPDATE Koi_growth_record SET ? WHERE id = ?`; 
    db.query(query, [updateKoiGrowthData, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

module.exports = {
    getKoiGrowthById,
    updateKoiGrowthById
};