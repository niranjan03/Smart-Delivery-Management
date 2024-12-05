const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const Order = require('../models/Order');
const DeliveryPartner = require('../models/DeliveryPartner');
const AssignmentMetrics = require('../models/AssignmentMetrics');

router.post('/api/assignments/run', async (req, res) => {
    try {
      // Find unassigned orders
      const unassignedOrders = await Order.find({ assignedTo: null });
  
      // Find available partners
      const availablePartners = await Partner.find({ isAvailable: true });
  
      // Assign orders to partners based on availability and area
      unassignedOrders.forEach(order => {
        const suitablePartners = availablePartners.filter(partner => partner.areas.includes(order.area) && partner.currentLoad < 3);
  
        if (suitablePartners.length > 0) {
          const assignedPartner = suitablePartners[0];
          order.assignedTo = assignedPartner._id;
          order.save();
  
          const newAssignment = new Assignment({
            orderId: order._id,
            partnerId: assignedPartner._id
          });
          newAssignment.save();
        }
      });
  
      res.json({ message: 'Assignments created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error assigning orders' });
    }
  });
  
  // Get assignment metrics
  router.get('/api/assignments/metrics', async (req, res) => {
    try {
      const totalAssignments = await Assignment.countDocuments();
      const successfulAssignments = await Assignment.countDocuments({ status: 'delivered' });
  
      // Calculate average delivery time (adjust based on your specific implementation)
      const averageDeliveryTime = await Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, avgDeliveryTime: { $avg: { $subtract: ['$deliveredAt', '$createdAt'] } } } }
      ]).exec();
  
      const metrics = {
        totalAssignments,
        successRate: (successfulAssignments / totalAssignments) * 100,
        averageDeliveryTime: averageDeliveryTime[0]?.avgDeliveryTime || 0
      };
  
      res.json(metrics);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching metrics' });
    }
  });

module.exports = router;