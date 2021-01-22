const Product = require('../models/product');
const User = require('../models/user');

exports.rateProducer = async (req, res) => {
    try {
        const producer = await User.findOne({ _id: req.body.ProducerId });

        const votedCount= producer.RatedCount || 0;
        const star= producer.Star || 0;
        
        const newStar= ((star*votedCount)+parseInt(req.body.Star))/(votedCount+1)


        const rate = await User.findByIdAndUpdate(req.body.ProducerId,
            { Star: newStar,
                $inc: {
                    RatedCount: 1
                }
            });

        if (rate) {
            return res.send(rate);
        }

    } catch (error) {

        console.log("error")
        res.status(400).send(error);
    }
};


exports.rateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.body.ProductId });
        const votedCount= product.RatedCount || 0;
        const star= product.Star || 0;
        
        const newStar= ((star*votedCount)+parseInt(req.body.Star))/(votedCount+1)
        const rate = await Product.findByIdAndUpdate(req.body.ProductId,
            { Star: newStar,
                $inc: {
                    RatedCount: 1
                }
            }).select("-Picture");

        if (rate) {
            return res.send(rate);
        }

    } catch (error) {
        res.status(400).send(error);
    }
};