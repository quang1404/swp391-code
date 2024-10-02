const express = require('express');
const router = express.Router();
const Pond = require('../models/pond');

// Get pond by ID
router.get('/:id', (req, res) => {
    const pondId = req.params.id;
    Pond.getPondById(pondId, (error, pond) => {
        if (error) {
            console.error('Error fetching pond:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (pond) {
            res.json(pond);
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

// Create pond
router.post('/', (req, res) => {
    const { id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id } = req.body;
    Pond.createPond(id, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, (error, result) => {
        if (error) {
            console.error('Error creating pond:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Pond created' });
        }
    });
});

// Update pond by ID
router.put('/:id', (req, res) => {
    const pondId = req.params.id;
    const { name, image, size, depth, volume, num_of_drains, pump_capacity, user_id } = req.body;
    Pond.updatePondById(pondId, name, image, size, depth, volume, num_of_drains, pump_capacity, user_id, (error, result) => {
        if (error) {
            console.error('Error updating pond:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Pond updated' });
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

// Delete pond by ID
router.delete('/:id', (req, res) => {
    const pondId = req.params.id;
    Pond.deletePondById(pondId, (error, result) => {
        if (error) {
            console.error('Error deleting pond:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Pond deleted' });
        } else {
            res.status(404).json({ message: 'Pond not found' });
        }
    });
});

// Get all pond
router.get('/', (req, res) => {
    Pond.getAllPonds((error, ponds) => {
        if (error) {
            console.error('Error fetching ponds:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(ponds); 
        }
    });
});

module.exports = router;