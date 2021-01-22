const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const basketLineSchema = new mongoose.Schema({
    BasketId: {
        type: ObjectId,
        ref: 'Basket',
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
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("BasketLine", basketLineSchema);