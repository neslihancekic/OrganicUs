const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const favoriteSchema = new mongoose.Schema({
        UserId:{
            type: ObjectId,
            ref: 'User',
            required: true
        },
        ProductId:{
            type: ObjectId,
            ref: 'Product',
            required: true
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model("Favorite",favoriteSchema);