const express = require('express');
const router = express.Router();
const KoiGrowth = require('../models/koiGrowth');

// Create koi growth record
router.post('/', (req, res) => {
  const { growth_date, age, size, weight, koi_id } = req.body;

  if (!growth_date || age <= 0 || size <= 0 || weight <= 0 || !koi_id) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }

  KoiGrowth.createKoiGrowthRecord(growth_date, age, size, weight, koi_id, (error, result) => {
    if (error) {
      console.error('Error creating koi growth record:', error);
      return res.status(500).json({ error: error.toString() });;
    }
    res.status(201).json({ message: 'Koi growth record created successfully' });
  });
});

// Get koi growth record by ID
router.get('/:id', (req, res) => {
  const koiGrowthId = req.params.id;
  KoiGrowth.getKoiGrowthById(koiGrowthId, (error, koiGrowthRecord) => {
    if (error) {
      console.error('Error fetching koi growth record:', error);
      return res.status(500).json({ error: error.toString() });;
    } else if (koiGrowthRecord) {
      res.json(koiGrowthRecord);
    } else {
      res.status(404).json({ message: 'Koi growth record not found' });
    }
  });
});

// Update koi growth record by ID
router.put('/:id', (req, res) => {
  const koiGrowthId = req.params.id;
  const updatedKoiGrowthData = req.body; 

  const { growth_date, age, size, weight } = updatedKoiGrowthData;
  if (!growth_date || age <= 0 || size <= 0 || weight <= 0) {
    return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
  }

  KoiGrowth.updateKoiGrowthById(koiGrowthId, updatedKoiGrowthData, (error, result) => {
    if (error) {
      console.error('Error updating koi growth record:', error);
      return res.status(500).json({ error: error.toString() });;
    } else if (result === 1) {
      res.json({ message: 'Koi growth record updated' });
    } else {
      res.status(404).json({ message: 'Koi growth record not found' });
    }
  });
});

module.exports = router;