const mongoose = require('mongoose');
const BasketLine = require('./basketLine');
const Product = require('./product');

const { ObjectId } = mongoose.Schema;

const basketSchema = new mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    TotalPrice: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);

basketSchema.methods.updatePrice = async function () {
    const basket = this;

    const basketLines = await BasketLine.find({ BasketId: basket._id });

    basket.TotalPrice = 0;
    for (const basketLine of basketLines) {
        const product = await Product.findById(basketLine.ProductId);
        if (product.IsDiscounted)
            basket.TotalPrice += product.Price * (100 - product.DiscountPercentage) / 100 * basketLine.Quantity;
        else
            basket.TotalPrice += product.Price * basketLine.Quantity;
    }

    await basket.save();
}

module.exports = mongoose.model("Basket", basketSchema);