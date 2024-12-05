const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    partnerId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['success', 'failed'], required: true },
    reason: { type: String }
});

module.exports = mongoose.model('Assignment', assignmentSchema);