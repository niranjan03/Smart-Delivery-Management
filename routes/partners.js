const express = require('express');
const router = express.Router();
const DeliveryPartner = require('../models/DeliveryPartner');

// Endpoint to update online status
router.patch('/:partnerId/online-status', async (req, res) => {
    const { partnerId } = req.params;
    const { onlineStatus } = req.body; // Expecting { onlineStatus: 'online' or 'offline' }

    if (!['online', 'offline'].includes(onlineStatus)) {
        return res.status(400).json({ message: 'Invalid online status' });
    }

    try {
        const updatedPartner = await DeliveryPartner.findOneAndUpdate(
            { partnerId },
            { onlineStatus },
            { new: true } // Return the updated document
        );

        if (!updatedPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }

        res.status(200).json({ message: 'Online status updated successfully', partner: updatedPartner });
    } catch (error) {
        console.error('Error updating online status:', error);
        res.status(500).json({ message: 'Error updating online status', error });
    }
});

router.post('/', async (req, res) => {
    try {
        const partnerData = req.body;
        console.log('Received partner data:', partnerData); // Log incoming data
        const newPartner = new DeliveryPartner(partnerData);
        await newPartner.save();
        res.status(201).json({ message: 'Partner registered successfully!' });
    } catch (error) {
        console.error('Error registering partner:', error);
        res.status(400).json({ message: 'Failed to register partner. Please try again.', error: error.message });
    }
});

// Get all delivery partners
router.get('/', async (req, res) => {
    try {
        const partners = await DeliveryPartner.find();
        res.json(partners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a delivery partner by ID
router.get('/:id', async (req, res) => {
    try {
        const partner = await DeliveryPartner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.json(partner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a delivery partner
router.put('/:id', async (req, res) => {
    try {
        const updatedPartner = await DeliveryPartner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.json(updatedPartner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a delivery partner
router.delete('/:id', async (req, res) => {
    try {
        const deletedPartner = await DeliveryPartner.findByIdAndDelete(req.params.id);
        if (!deletedPartner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.json({ message: 'Partner deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;