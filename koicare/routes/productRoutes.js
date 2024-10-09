const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get product by ID
router.get('/:id', (req, res) => {
    const productId = req.params.id;
    Product.getProductById(productId, (error, product) => {
        if (error) {
            console.error('Error fetching product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Create product
router.post('/', (req, res) => {
    const { id, name, description, price, quantity } = req.body;
    Product.createProduct(id, name, description, price, quantity, (error, result) => {
        if (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Product created' });
        }
    });
});

// Update product by ID
router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price, quantity } = req.body;
    Product.updateProductById(productId, name, description, price, quantity, (error, result) => {
        if (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Product updated' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Delete product by ID
router.delete('/:id', (req, res) => {
    const productId = req.params.id;
    Product.deleteProductById(productId, (error, result) => {
        if (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    });
});

// Get all products
router.get('/', (req, res) => {
    Product.getAllProducts((error,   
 products) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(products); 
        }
    });
});

module.exports = router;