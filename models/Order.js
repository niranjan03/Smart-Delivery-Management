const mongoose = require('mongoose');

// Function to generate a unique order number
const generateOrderNumber = async () => {
    const count = await Order.countDocuments();
    return `ORD${count + 1}`; // Generates IDs like ORD1, ORD2, etc.
};

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, unique: true },
    customer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },
    area: { type: String, required: true },
    items: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    status: { type: String, enum: ['pending', 'assigned', 'picked', 'delivered'], default: 'pending' },
    scheduledFor: { type: String, required: true },
    assignedTo: { type: String,  },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Pre-save hook to generate orderNumber
orderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        this.orderNumber = await generateOrderNumber();
    }
    next();
});

module.exports = mongoose.model('Order', orderSchema);