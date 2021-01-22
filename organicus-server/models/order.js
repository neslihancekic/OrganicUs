const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    Phone: {
        type: Number,
        trim: true,
        required: true
    },
    ShippingAddress: {
        type: String,
        trim: true,
        required: true
    },
    BillingAddress: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Order", orderSchema);
