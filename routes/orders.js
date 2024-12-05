const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const DeliveryPartner = require('../models/DeliveryPartner');

// Create a new order
router.post('/', async (req, res) => {
    
    try {
        const order = new Order(req.body);
    console.log('Received partner data:', order);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an order
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update order status
router.put('/:id/status', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      order.status = req.body.status;
      if (req.body.status === 'delivered') {
        order.deliveredBy = req.body.deliveredBy;
        order.deliveredAt = Date.now();
      }
      await order.save();
      res.json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.post('/api/orders/:orderId/assign', async (req, res) => {
    const { orderId, partnerId } = req.body;
  
    try {
      const order = await Order.findByIdAndUpdate(orderId, {
        assignedTo: partnerId
      }, { new: true });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;