const express = require('express');
const router = express.Router();
const WaterValue = require('../models/waterValue');

// Get all water parameter values
router.get('/', (req, res) => {
    WaterValue.getAllWaterParams((error, waterParams) => {
        if (error) {
            console.error('Error fetching water parameters:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.json(waterParams);
        }
    });
});

// Get water param value by id of water and name of value
router.get('/:id/:name', (req, res) => {
    const waterParamId = req.params.id;
    const waterParamName = req.params.name;
    WaterValue.getWaterParamByIdAndName(waterParamId, waterParamName, (error, waterParam) => {
        if (error) {
            console.error('Error fetching water parameter:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (waterParam) {
            res.json(waterParam);
        } else {
            res.status(404).json({ message: 'Water parameter not found' });
        }
    });
});

// Create water param value
router.post('/', (req, res) => {
    const { name, param_value, water_parameters_id } = req.body;

    if (!name || !param_value || !water_parameters_id) {
        return res.status(400).json({ message: 'Invalid input data. Please check all fields.' });
    }

    WaterValue.createWaterParam(name, param_value, water_parameters_id, (error, result) => {
        if (error) {
            console.error('Error creating water parameter:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Water parameter created' });
        }
    });
});

// Update water param value by id of water and name of value
router.put('/:id/:name', (req, res) => {
    const waterParamId = req.params.id;
    const waterParamName = req.params.name;
    const updateValue = req.body.param_value;

    if (!updateValue) {
        return res.status(400).json({ message: 'Invalid input data. Param value is required.' });
    }

    WaterValue.updateWaterParamByIdAndName(waterParamId, waterParamName, updateValue, (error, result) => {
        if (error) {
            console.error('Error updating water parameter:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Water parameter updated' });
        } else {
            res.status(404).json({ message: 'Water parameter not found' });
        }
    });
});

// Delete water param by id of water and name of value
router.delete('/:id/:name', (req, res) => {
    const waterParamId = req.params.id;
    const waterParamName = req.params.name;

    WaterValue.deleteWaterParam(waterParamId, waterParamName, (error, result) => {
        if (error) {
            console.error('Error deleting water parameter:', error);
            return res.status(500).json({ message: 'Internal server error' });
        } else if (result === 1) {
            res.json({ message: 'Water parameter deleted' });
        } else {
            res.status(404).json({ message: 'Water parameter not found' });
        }
    });
});

module.exports = router;