const Comment = require('../models/comment')
const {errorHandler} = require("../helpers/dbErrorHandler");


exports.create = (req,res) => {
    console.log(req.body)
    const comment = new Comment(req.body)
    comment.save((err, data) => {
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

exports.remove = (req,res) => {
    let comment = req.comment
    comment.remove((err, deletedComment) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        
        res.json({
            message: "Comment deleted"
        })
    })
}


exports.list = (req,res) => {
    Comment.find({ProductId : req.product})
    .exec((err,comments) => {
        if(err){
            return res.status(400).json({
                error: 'Comment not found'
            })
        }
        res.json(comments)
    })
}

exports.commentById = (req,res,next,id)=>{
    Comment.findById(id).exec((err, comment)=>{
        if(err || !comment){
            return res.status(400).json({
                error: 'Comment not found'
            })
        }
        req.comment = comment
        next()
    })
}