const express = require('express');
const router = express.Router();
const Koi = require('../models/koi');

//Get koi by id
router.get('/koi/:id', (req, res) => {
  const koiId = req.params.id;
  Koi.getKoiById(koiId, (error, koi) => {
    if (error) {
    } else if (koi) {
      res.json(koi);
    } else {
      res.status(404).json({ message: 'Koi not found' });
    }
  });
});

//Create koi
router.post('/', (req, res) => {
    const { name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id } = req.body;
    Koi.createKoi(name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id, (error, result) => {
        if (error) {
        } else {
            res.status(201).json({ message: 'Koi created' });
        }
    });
});

// Update koi by ID
router.put('/:id', (req, res) => {
    const koiId = req.params.id;
    const { name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id } = req.body;
    Koi.updateKoiById(koiId, name, image, body_shape, age, size, weight, gender, breed, origin, selling_price, pond_id, (error, result) => {
        if (error) {
        } else if (result === 1) {
            res.json({ message: 'Koi updated' });
        } else {
            res.status(404).json({ message: 'Koi not found' });
        }
    });
});

// Delete koi by ID
router.delete('/:id', (req, res) => {
    const koiId = req.params.id;
    Koi.deleteKoiById(koiId, (error, result) => {
        if (error) {
        } else if (result === 1) {
            res.json({ message: 'Koi deleted' });
        } else {
            res.status(404).json({ message: 'Koi not found' });
        }
    });
});

// Get all koi
router.get('/', (req, res) => {
    Koi.getAllKoi((error, koi) => {
        if (error) {
            console.error('Error fetching koi:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(koi); 
        }
    });
});

module.exports = router;