const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
        Title:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        CategoryID:{
            type: ObjectId,
            ref: 'Category',
            required: true
        },
        ProducerID:{
            type: ObjectId,
            ref: 'User',
            required: true
        },
        Price:{
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        Picture:{
            data: Buffer,
            ContentType: String
        },
        Info:{
            type: String,
            maxlength: 2000
        },
        IsDiscounted:{
            type: Boolean,
            default : false
        },
        DiscountPercentage:{
            type: Number,
            trim: true,
            maxlength: 32
        },
        Stock:{
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        Sold:{
            type: Number,
            default: 0
        },
        Star:{ //average
            type: Number,
            trim: true,
            maxlength: 32,
            default:0
        },
        RatedCount:{ //oylayan kişi sayısı
            type: Number,
            trim: true,
            maxlength: 32,
            default:0
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product",productSchema);