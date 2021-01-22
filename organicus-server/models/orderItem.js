const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
    OrderId: {
        type: ObjectId,
        ref: 'Order',
        required: true
    },
    ProductId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    Quantity: {
        type: Number,
        default: 1
    },
    Shipped: {
        type: Boolean,
        default: false
    },
    Prepearing: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("OrderItems", orderItemSchema);
