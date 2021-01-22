const Favorite = require('../models/favorite')
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.favoriteById = (req,res,next,id)=>{
    Favorite.findById(id).exec((err, favorite)=>{
        if(err || !favorite){
            return res.status(400).json({
                error: 'Favorite not found'
            })
        }
        req.favorite = favorite
        next()
    })
}


exports.add = async (req,res) => {
    const favorite = new Favorite({UserId: req.profile._id, ProductId: req.body.ProductId})
    const docs = await Favorite.find({ProductId: req.body.ProductId,
                                         UserId: req.profile._id}).exec()
    if(docs.length == 0){
        favorite.save((err, data) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json({ data });
        }
        )
    }
    else{
        return res.status(200).json({message: "Duplicate handled"})
       }
    
}


exports.list = (req,res) => {
    //sort var
    let order = req.query.order ? req.query.order : 'asc' 
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    
    Favorite.find({UserId: req.profile._id})
    .populate({ path: 'ProductId', select: '-Picture' })
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error: 'Favorites not found'
            })
        }

        res.json(products)
    })
}


exports.remove = (req,res) => {
    let favorite = req.favorite
    favorite.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        
        res.json({
            message: "Favorite deleted"
        })
    })
}