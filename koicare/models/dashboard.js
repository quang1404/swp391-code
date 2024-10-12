const db = require('../config/db');

const getDashboardData = (userId, callback) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM Koi WHERE pond_id IN (SELECT id FROM Pond WHERE user_id = ?)) AS total_koi,
      (SELECT COUNT(*) FROM Pond WHERE user_id = ?) AS total_ponds,
      (SELECT COUNT(*) FROM \`Order\` WHERE user_id = ?) AS total_orders
  `;

  db.query(query, [userId, userId, userId], (error, results) => {
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

module.exports = {
  getDashboardData
};