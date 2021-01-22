const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const commentSchema = new mongoose.Schema({
        UserId:{
            type: ObjectId,
            ref: 'User',
            required: true
        },
        ProductId:{
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        Comment:{
            type: String,
            trim: true,
            required: true,
            maxlength: 500
        }
    },
    {timestamps: true}
);
module.exports = mongoose.model("Comment",commentSchema);