const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware'); 
const Dashboard = require('../models/dashboard'); 

router.get('/', verifyToken, (req, res) => {
  const userId = req.userId; 

  Dashboard.getDashboardData(userId, (error, data) => {
    if (error) {
      console.error('Error fetching dashboard data:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.json(data); 
  });
});

module.exports = router;