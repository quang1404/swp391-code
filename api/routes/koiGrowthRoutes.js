const express = require('express');
const router = express.Router();
const KoiGrowth = require('../models/koiGrowth');

// Get koi growth record by ID
router.get('/:id', (req, res) => {
    const koiGrowthId = req.params.id;
    KoiGrowth.getKoiGrowthById(koiGrowthId, (error, koiGrowthRecord) => {
        if (error) {
            console.error('Error fetching koi growth record:', error);
            return res.status(500).json({ message: 'Internal server error' });
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

    KoiGrowth.updateKoiGrowthById(koiGrowthId, updatedKoiGrowthData, (error, result) => {
        if (error) {
            console.error('Error updating koi growth record:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Koi growth record updated' });
        } else {
            res.status(404).json({ message: 'Koi growth record not found' });
        }
    });
});

module.exports = router;