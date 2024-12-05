const mongoose = require('mongoose');

const failureReasonSchema = new mongoose.Schema({
    reason: { type: String, required: true },
    count: { type: Number, required: true, default: 0 }
});

const assignmentMetricsSchema = new mongoose.Schema({
    totalAssigned: { type: Number, required: true, default: 0 },
    successRate: { type: Number, required: true, default: 0 },
    averageTime: { type: Number, required: true, default: 0 },
    failureReasons: [failureReasonSchema]
});

module.exports = mongoose.model('AssignmentMetrics', assignmentMetricsSchema);