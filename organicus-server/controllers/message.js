const Message = require('../models/message')
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.create = (req,res) => {
    console.log(req.body)
    const message = new Message(req.body)
    message.save((err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    }
    )
}

exports.list = (req,res) => {
    Message.find({ProductId : req.product})
    .select("-Picture")
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })
}