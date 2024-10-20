const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { verifyToken } = require('../middleware/authMiddleware');

// Create a new order
router.post('/', verifyToken, (req, res) => {
  const userId = req.userId;
  const { orderItems, totalAmount } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'Order items cannot be empty' });
  }
  if (totalAmount <= 0) {
    return res.status(400).json({ message: 'Total amount must be a positive number' });
  }

  Order.createOrder(userId, orderItems, totalAmount, (error, orderId) => {
    if (error) {
      console.error('Error creating order:', error);
      if (error.code === 'ER_NO_REFERENCED_ROW_2') { 
        return res.status(400).json({ message: 'Invalid product ID in order items' });
      } else {
        return res.status(500).json({ error: error.toString() });;
      }
    }
    res.status(201).json({ message: 'Order created successfully', orderId });
  });
});

// Get order by ID
router.get('/:id', verifyToken, (req, res) => {
  const orderId = req.params.id;

  Order.getOrderById(orderId, (error, order) => {
    if (error) {
      console.error('Error fetching order:', error);
      return res.status(500).json({ error: error.toString() });;
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

  const { orderItems, totalAmount, status } = updatedOrderData;
  if (totalAmount && totalAmount <= 0) {
    return res.status(400).json({ message: 'Total amount must be a positive number' });
  }
  if (status && !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid order status' });
  }

  Order.updateOrderById(orderId, updatedOrderData, (error, result) => {
    if (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ error: error.toString() });;
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
      return res.status(500).json({ error: error.toString() });;
    }
    if (result === 1) {
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  });
});

module.exports = router;