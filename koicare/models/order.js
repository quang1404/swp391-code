const db = require('../config/db');

// create order
const createOrder = (userId, orderItems, totalAmount, callback) => {

    if (!orderItems || orderItems.length === 0) {
        return callback(new Error('Order items cannot be empty'), null);
    }
    if (totalAmount <= 0) {
        return callback(new Error('Total amount must be greater than 0'), null);
    }

    db.beginTransaction((err) => {
        if (err) {
            return callback(err, null);
        }
        try {
            const orderQuery = `INSERT INTO \`Order\` (user_id, total_amount) VALUES (?, ?)`;
            db.query(orderQuery, [userId, totalAmount], (error, orderResult) => {
                if (error) {
                    throw error;
                }
                const orderId = orderResult.insertId;
                const orderItemValues = orderItems.map(item => [
                    orderId,
                    item.product_id,
                    item.quantity,
                    item.price
                ]);
                const orderItemQuery = `
          INSERT INTO Order_Product (order_id, product_id, quantity, price) 
          VALUES ?
        `;
                db.query(orderItemQuery, [orderItemValues], (error, orderItemResult) => {
                    if (error) {
                        throw error;
                    }
                    db.commit((err) => {
                        if (err) {
                            throw err;
                        }
                        callback(null, orderId);
                    });
                });
            });
        } catch (error) {
            db.rollback(() => {
                console.error('Error creating order:', error);
                callback(error, null);
            });
        }
    });
};

// Get order by ID 
const getOrderById = (orderId, callback) => {
    const query = `
    SELECT o.id AS order_id, o.order_date, o.total_amount, o.user_id, o.status, oi.product_id, oi.quantity, p.name, p.price 
    FROM \`Order\` o
    JOIN Order_Product oi ON o.id = oi.order_id  -- Use Order_Product
    JOIN Product p ON oi.product_id = p.id
    WHERE o.id = ?;
  `;
    db.query(query, [orderId], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        const order = processOrderItems(results);
        return callback(null, order);
    });
};

// Update order by ID
const updateOrderById = (orderId, updatedOrderData, callback) => {

    const { orderItems, totalAmount, status } = updatedOrderData;
    if (totalAmount && totalAmount <= 0) {
        return callback(new Error('Total amount must be greater than 0'), null);
    }
    if (status && !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return callback(new Error('Invalid order status'), null);
    }
    if (orderItems) {
        for (const item of orderItems) {
            if (item.quantity <= 0 || item.price <= 0) {
                return callback(new Error('Invalid order item data'), null);
            }
        }
    }

    db.beginTransaction((err) => {
        if (err) {
            return callback(err, null);
        }
        try {
            const { orderItems, ...orderData } = updatedOrderData;
            // Update the order in the Order table
            const orderQuery = `UPDATE \`Order\` SET ? WHERE id = ?`;
            db.query(orderQuery, [orderData, orderId], (error, orderResult) => {
                if (error) {
                    throw error;
                }
                // Delete existing order items
                const deleteOrderItemQuery = `DELETE FROM Order_Product WHERE order_id = ?`;
                db.query(deleteOrderItemQuery, [orderId], (error, deleteResult) => {
                    if (error) {
                        throw error;
                    }
                    // Insert updated order items
                    if (orderItems && orderItems.length > 0) {
                        const orderItemValues = orderItems.map(item => [
                            orderId,
                            item.product_id,
                            item.quantity,
                            item.price
                        ]);
                        const orderItemQuery = `
                                                INSERT INTO Order_Product (order_id, product_id, quantity, price) 
                                                VALUES ?
                                               `;
                        db.query(orderItemQuery, [orderItemValues], (error, orderItemResult) => {
                            if (error) {
                                throw error;
                            }
                            db.commit((err) => {
                                if (err) {
                                    throw err;
                                }
                                callback(null, orderResult.affectedRows);
                            });
                        });
                    } else {
                        db.commit((err) => {
                            if (err) {
                                throw err;
                            }
                            callback(null, orderResult.affectedRows);
                        });
                    }
                });
            });
        } catch (error) {
            db.rollback(() => {
                console.error('Error updating order:', error);
                callback(error, null);
            });
        }
    });
};

// Delete order by ID
const deleteOrderById = (orderId, callback) => {
    db.beginTransaction((err) => {
        if (err) {
            return callback(err, null);
        }
        try {
            // Delete order items 
            const deleteOrderItemQuery = `DELETE FROM Order_Product WHERE order_id = ?`;
            db.query(deleteOrderItemQuery, [orderId], (error, deleteResult) => {
                if (error) {
                    throw error;
                }
                // Delete the order from the Order table
                const orderQuery = `DELETE FROM \`Order\` WHERE id = ?`;
                db.query(orderQuery, [orderId], (error, orderResult) => {
                    if (error) {
                        throw error;
                    }
                    db.commit((err) => {
                        if (err) {
                            throw err;
                        }
                        callback(null, orderResult.affectedRows);
                    });
                });
            });
        } catch (error) {
            db.rollback(() => {
                console.error('Error deleting order:', error);
                callback(error, null);
            });
        }
    });
};

// Helper function to process order items
const processOrderItems = (items) => {
    const order = {
        order_id: null,
        user_id: null,
        order_date: null,
        total_amount: null,
        status: null,
        items: []
    };
    if (items.length > 0) {
        order.order_id = items[0].order_id;
        order.user_id = items[0].user_id;
        order.order_date = items[0].order_date;
        order.total_amount = items[0].total_amount;
        order.status = items[0].status;
        for (const item of items) {
            order.items.push({
                product_id: item.product_id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });
        }
    }
    return order;
};

module.exports = {
    createOrder,
    getOrderById,
    updateOrderById,
    deleteOrderById
};