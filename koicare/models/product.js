const db = require('../config/db'); 

// Get product by ID
const getProductById = (id, callback) => {
    const query = `SELECT * FROM Product WHERE id = ?;`;
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

// Create product
const createProduct = (id, name, description, price, quantity, callback) => {
    const query = `
        INSERT INTO Product (id, name, description, price, quantity)
        VALUES (?, '?', '?', ?, ?);`;
    db.query(query, [id, name, description, price, quantity], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

// Update product by ID
const updateProductById = (id, name, description, price, quantity, callback) => {
    const query = `UPDATE Product
    SET name = '?', description = '?', price = ?, quantity = ?
    WHERE id = ?;`;
    db.query(query, [name, description, price, quantity, id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

// Delete product by ID
const deleteProductById = (id, callback) => {
    const query = `DELETE FROM Product WHERE id = ?;`; // Added FROM for clarity
    db.query(query, [id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows); 
    });
};

// Get all products
const getAllProducts = (callback) => {
    const query = `SELECT * FROM Product;`;
    db.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results); 
    });
};

module.exports = {
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
    getAllProducts 
};