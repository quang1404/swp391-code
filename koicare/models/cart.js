const db = require('../config/db');

// Get cart by user id
const getCartByUserId = (userId, callback) => {
    const query = `
    SELECT c.id AS cart_id, c.user_id, ci.product_id, ci.quantity, p.name, p.price 
    FROM Cart c
    LEFT JOIN Cart_item ci ON c.id = ci.cart_id
    LEFT JOIN Product p ON ci.product_id = p.id
    WHERE c.user_id = ?;
  `;
    db.query(query, [userId], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        const cart = processCartItems(results);
        return callback(null, cart);
    });
};

// Function to process cart items
const processCartItems = (items) => {
    const cart = {
        cart_id: null,
        user_id: null,
        items: []
    };
    if (items.length > 0) {
        cart.cart_id = items[0].cart_id;
        cart.user_id = items[0].user_id;
        for (const item of items) {
            cart.items.push({
                product_id: item.product_id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });
        }
    }
    return cart;
};

// Add item to cart
const addItemToCart = (userId, productId, quantity, callback) => {
    const query = `
      INSERT INTO Cart (user_id) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM Cart WHERE user_id = ?);
  
      INSERT INTO Cart_item (cart_id, product_id, quantity) 
      VALUES ((SELECT id FROM Cart WHERE user_id = ?), ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?;
    `;
    db.query(query, [userId, userId, userId, productId, quantity, quantity], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, results.affectedRows);
    });
};

// Update item quantity in cart
const updateCartItemQuantity = (userId, productId, quantity, callback) => {
    const query = `
      UPDATE Cart_item 
      SET quantity = ? 
      WHERE cart_id = (SELECT id FROM Cart WHERE user_id = ?) AND product_id = ?;
    `;
    db.query(query, [quantity, userId, productId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  };
  
  // Remove item from cart
  const removeItemFromCart = (userId, productId, callback) => {
    const query = `
      DELETE FROM Cart_item 
      WHERE cart_id = (SELECT id FROM Cart WHERE user_id = ?) AND product_id = ?;
    `;
    db.query(query, [userId, productId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  };
  
  module.exports = {
    getCartByUserId,
    addItemToCart,
    updateCartItemQuantity,
    removeItemFromCart
  };