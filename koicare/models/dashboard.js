const db = require('../config/db');
const { formatDate } = require('../utils/dateHelper');

const getDashboardData = (userId, callback) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM Koi WHERE pond_id IN (SELECT id FROM Pond WHERE user_id = ?)) AS total_koi,
      (SELECT COUNT(*) FROM Pond WHERE user_id = ?) AS total_ponds,
      (SELECT COUNT(*) FROM \`Order\` WHERE user_id = ?) AS total_orders,
      (SELECT MAX(order_date) FROM \`Order\` WHERE user_id = ?) AS lastOrderDate
  `;

  db.query(query, [userId, userId, userId], (error, results) => {
    if (error) {
      console.error('Error fetching dashboard data:', error);
      return callback(new Error('Failed to fetch dashboard data'), null);
    }
    if (results.length > 0) {
      const data = results[0];
      data.lastOrderDate = formatDate(data.lastOrderDate); 
      return callback(null, data);
    } else {
      return callback(null, {}); 
    }
  });
};

module.exports = {
  getDashboardData
};