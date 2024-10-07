const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { verifyToken } = require('../middleware/authMiddleware');   


// Create a new order
router.post('/', verifyToken, (req, res) => {
  const userId = req.userId; // Get user ID from authentication middleware
  const { orderItems, totalAmount } = req.body;

  Order.createOrder(userId, orderItems, totalAmount, (error, orderId) => {
    if (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(201).json({   
 message: 'Order created successfully', orderId });
  });
});

// Get order by ID
router.get('/:id', verifyToken, (req, res) => {
  const orderId = req.params.id;

  Order.getOrderById(orderId, (error, order) => {
    if (error) {
      console.error('Error fetching order:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  });
});

// Update an order by ID
router.put('/:id', verifyToken, (req, res) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;

  Order.updateOrderById(orderId, updatedOrderData, (error, result) => {
    if (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result === 1) {
      res.json({ message: 'Order updated successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
});

// Delete an order by ID
router.delete('/:id', verifyToken, (req, res) => {
  const orderId = req.params.id;

  Order.deleteOrderById(orderId, (error, result) => {
    if (error) {
      console.error('Error deleting order:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result === 1) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
});

module.exports = router;

