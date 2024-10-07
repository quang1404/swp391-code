const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const { verifyToken } = require('../middleware/authMiddleware');

// Get cart by user ID
router.get('/', verifyToken, (req, res) => {
    const userId = req.userId; 

    Cart.getCartByUserId(userId, (error, cart) => {
        if (error) {
            console.error('Error fetching cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(cart);
    });
});

// Add item to cart
router.post('/', verifyToken, (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    Cart.addItemToCart(userId, productId, quantity, (error, result) => {
        if (error) {
            console.error('Error adding item to cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Item added to cart' });
    });
});

// Update item quantity in cart
router.put('/:productId', verifyToken, (req, res) => {
    const userId = req.userId;
    const productId = req.params.productId;
    const { quantity } = req.body;

    Cart.updateCartItemQuantity(userId, productId, quantity, (error, result) => {
        if (error) {
            console.error('Error updating cart item quantity:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ message: 'Cart item quantity updated' });
    });
});

// Remove item from cart
router.delete('/:productId', verifyToken, (req, res) => {
    const userId = req.userId;
    const productId = req.params.productId;

    Cart.removeItemFromCart(userId, productId, (error, result) => {
        if (error) {
            console.error('Error removing item from cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json({ message: 'Item removed from cart' });
    });
});

module.exports = router;