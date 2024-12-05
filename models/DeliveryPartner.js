const mongoose = require('mongoose')

// Function to generate a unique partner ID
function generatePartnerId() {
    return `PID-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}


const deliveryPartnerSchema = new mongoose.Schema({
    partnerId:{ type: String, unique: true },
    name:{ type: String, required: true},
    email:{ type: String, required: true, unique: true},
    phone: { type: String, required: true, unique: true},
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    currentLoad: { type: Number, default: 0, required: true },
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    shift: {
        start: { type: String },
        end: { type: String }
    },
    metrics: {
        rating: { type: Number, default: 0 },
        completedOrders: { type: Number, default: 0 },
        cancelledOrders: { type: Number, default: 0 }
    }
});

// Pre-save middleware to generate partnerId
deliveryPartnerSchema.pre('save', function (next) {
    if (!this.partnerId) {
        this.partnerId = generatePartnerId();
    }
    next();
});


module.exports = mongoose.model('DeliveryPartner', deliveryPartnerSchema);