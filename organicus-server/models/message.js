const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const messageSchema = new mongoose.Schema({
        SenderId:{
            type: ObjectId,
            ref: 'User',
            required: true
        },
        CustomerId:{
            type: ObjectId,
            ref: 'User',
            required: true
        },
        ProductId:{
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        Message:{
            type: String,
            trim: true,
            required: true,
            maxlength: 500
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model("Message",messageSchema);