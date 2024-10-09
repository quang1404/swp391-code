const db = require('../config/db'); 

// Get koi growth record by ID
const getKoiGrowthById = (id, callback) => {
    const query = `SELECT * FROM KoiGrowth WHERE id = ?`; 
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
    const query = `UPDATE KoiGrowth SET ? WHERE id = ?`; 
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