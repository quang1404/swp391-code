const db = require('../config/db');

// Get water param value by id of water and name of value
const getWaterParamByIdAndName = (id, name, callback) => {
    const query = `SELECT param_value FROM Water_parameter_value WHERE water_parameters_id = ? AND name = ?;`;
    db.query(query, [id, name], (error, results) => {
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

// Create water param value
const createWaterParam = (name, param_value, water_parameters_id, callback) => {
    if (!name || !param_value || !water_parameters_id) {
        return callback(new Error('Invalid input data. Please check all fields.'), null);
    }

    const query = `
    INSERT INTO Water_parameter_value (name, param_value, water_parameters_id)  
    VALUES (?, ?, ?);`;
    db.query(query, [name, param_value, water_parameters_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update water param value by id of water and name of value
const updateWaterParamByIdAndName = (id, name, updateValue, callback) => {
    if (!updateValue) {
        return callback(new Error('Invalid input data. Param value is required.'), null);
    }

    const query = `UPDATE Water_parameter_value SET param_value = ? WHERE water_parameters_id = ? AND name = ?;`;
    db.query(query, [updateValue, id, name], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Delete water param by id of water and name of value
const deleteWaterParam = (id, name, callback) => {
    const query = `DELETE FROM Water_parameter_value WHERE water_parameters_id = ? AND name = ?;`;
    db.query(query, [id, name], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Get all water parameter values
const getAllWaterParams = (callback) => {
    const query = `SELECT * FROM Water_parameter_value;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results);
    });
};

module.exports = {
    getWaterParamByIdAndName,
    createWaterParam,
    updateWaterParamByIdAndName,
    deleteWaterParam,
    getAllWaterParams
};