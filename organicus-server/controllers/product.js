const formidable = require('formidable')
const _ = require("lodash")
const fs = require("fs")
const Product = require('../models/product')
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.productById = (req,res,next,id)=>{
    Product.findById(id).exec((err, product)=>{
        if(err || !product){
            return res.status(400).json({
                error: 'Product not found'
            })
        }
        req.product = product
        next()
    })
}

exports.read = (req,res) => {
    req.product.Picture = undefined
    return res.json(req.product)
}

exports.remove = (req,res) => {
    let product = req.product
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        var title = deletedProduct.Title
        res.json({
            title,
            message: "Product deleted"
        })
    })
}

exports.update = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const {Title,CategoryID,ProducerID,Price,Stock} = fields
        
        if(!Title || !CategoryID || !ProducerID || !Price || !Stock){
            return res.status(400).json({
                error: 'All fields must filled'
            })
        }
        
        let product = req.product
        product = _.extend(product, fields)

        if(files.Picture){
            if(files.Picture.size> 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1MB'
                })
            }
            product.Picture.data = fs.readFileSync(files.Picture.path)
            product.Picture.contentType = files.Picture.type
        }

        product.save((err,result) => {
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }

            res.json({ result });
        })

    })
}

exports.create = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files) => {
        if(err){
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const {Title,CategoryID,ProducerID,Price,Stock} = fields
        
        if(!Title || !CategoryID || !ProducerID || !Price || !Stock){
            return res.status(400).json({
                error: 'All fields must filled'
            })
        }
        
        let product = new Product(fields)

        if(files.Picture){
            if(files.Picture.size> 1000000){
                return res.status(400).json({
                    error: 'Image should be less than 1MB'
                })
            }
            product.Picture.data = fs.readFileSync(files.Picture.path)
            product.Picture.contentType = files.Picture.type
        }

        product.save((err,result) => {
            if(err){
                console.log(err)
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }

            res.json({ result });
        })

    })
}


exports.list = (req,res) => {
    let order = req.query.order ? req.query.order : 'asc' 
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    
    Product.find({})
    .select("-Picture")
    .populate('CategoryID')
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })
}

exports.filter = (req,res) => {

    let order = req.query.order ? req.query.order : 'asc' 
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Product.find({CategoryID : req.category})
    .select("-Picture")
    .populate('CategoryID')
    .sort([[sortBy,order]])
    .limit(limit)
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })

}

exports.producerProducts = (req,res) => {

    let order = req.query.order ? req.query.order : 'asc' 
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    Product.find({ProducerID : req.profile._id})
    .select("-Picture")
    .populate('CategoryID')
    .sort([[sortBy,order]])
    .exec((err,products) => {
        if(err){
            return res.status(400).json({
                error: 'Products not found'
            })
        }
        res.json(products)
    })
}


exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-Picture")
        .populate("CategoryID")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.picture = (req,res,next) => {

    if(req.product.Picture.data){
        res.set('Content-Type', req.product.Picture.contentType)
        return res.send(req.product.Picture.data)
    }
    next()
}