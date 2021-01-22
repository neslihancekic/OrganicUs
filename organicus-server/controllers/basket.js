const Basket = require('../models/basket');
const BasketLine = require('../models/basketLine');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');
const User = require('../models/user');

const { sendEmailToProducer, sendEmailToCustomer } = require('../helpers/sendEmail');

exports.getBasket = async (req, res) => {
    try {
        const basket = await Basket.findOne({ UserId: req.profile._id });
        if (!basket) {
            const basket = new Basket({ UserId: req.profile._id });
            await basket.save();

            return res.send({ basket, basketLines: [] });
        }

        const basketLines = await BasketLine.find({ BasketId: basket._id });
        await basket.updatePrice();
        res.send({ basket, basketLines });
    } catch (error) {
        res.status(400).send();
    }
};

exports.addBasketLine = async (req, res) => {
    try {

        const basket = await Basket.findOne({ UserId: req.profile._id });
        if (!basket) {
            const newBasket = new Basket({ UserId: req.profile._id });
            await newBasket.save();
        }
        await basket.updatePrice();

        const product = await Product.findById(req.body.ProductId)
        if (!product)
            throw new Error(`Product with id ${product._id} not found`)

        const productOnBasket = await BasketLine.findOne({ BasketId: basket._id, ProductId: req.body.ProductId });
        if (productOnBasket) {
            productOnBasket.Quantity += req.body.Quantity || 1

            if (productOnBasket.Quantity > product.Stock)
                throw new Error(`Stock of the product with id ${product._id} is not enough`)

            await productOnBasket.save()
            await basket.updatePrice();

            // in below, we change quantity just to send how many new added
            productOnBasket.Quantity = req.body.Quantity || 1
            return res.send(productOnBasket);
        }

        if (req.body.Quantity > product.Stock)
            throw new Error(`Stock of the product with id ${product._id} is not enough`)

        const basketLine = new BasketLine({ BasketId: basket._id, ...req.body });
        await basketLine.save();

        await basket.updatePrice();
        res.send(basketLine);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateBasketLine = async (req, res) => {
    try {
        if (!req.body.Quantity)
            throw new Error("Quantity must be provided");

        const basket = await Basket.findOne({ UserId: req.profile._id });
        const basketLine = await BasketLine.findById(req.body.basketLineId);
        await basket.updatePrice();
        
        const product = await Product.findById(basketLine.ProductId)
        if (req.body.Quantity > product.Stock)
            throw new Error(`Product with id ${product._id} not found`);

        basketLine.Quantity = req.body.Quantity
        await basketLine.save();

        await basket.updatePrice();
        res.send(basketLine);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.removeBasketLine = async (req, res) => {
    try {
        const basket = await Basket.findOne({ UserId: req.profile._id });
        const basketLine = await BasketLine.findByIdAndDelete(req.body.basketLineId);

        await basket.updatePrice();
        res.send(basketLine);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.removeBasket = async (req, res) => {
    try {
        const basket = await Basket.findOneAndDelete({ UserId: req.profile._id });
        res.send(basket);
    } catch (error) {
        res.status(400).send();
    }
};

exports.confirmBasket = async (req, res) => {
    try {
        const basket = await Basket.findOne({ UserId: req.profile._id });
        if (!basket)
            throw new Error('No items in basket');

        const basketLines = await BasketLine.find({ BasketId: basket._id });
        if (!basketLines)
            throw new Error('No items in basket');

        const order = new Order({
            UserId: req.profile._id,
            Phone: req.body.phone,
            ShippingAddress: req.body.shippingAddress,
            BillingAddress: req.body.billingAddress || req.body.shippingAddress
        });

        products = [];
        producers = []
        for (const basketLine of basketLines) {
            const orderItem = new OrderItem({
                OrderId: order._id,
                ProductId: basketLine.ProductId,
                Quantity: basketLine.Quantity
            });

            const product = await Product.findById(basketLine.ProductId);
            products.push({
                name: product.Title,
                price: product.Price,
                count: basketLine.Quantity,
                producerId: product.ProducerID
            });

            product.Stock -= basketLine.Quantity;
            product.Sold += basketLine.Quantity;
            await product.save();

            const producer = await User.findById(product.ProducerID);
            producers.push(producer);

            await orderItem.save();
        }

        await order.save();
        await basket.remove();
        for (const basketLine of basketLines) {
            await basketLine.remove();
        }

        // sending mail to producers
        for (const producer of producers) {
            const thisProducersProducts =
                products.filter(product => product.producerId.equals(producer._id))

            sendEmailToProducer(producer.email, {
                user: {
                    name: req.profile.firstName + " " + req.profile.lastName,
                    address: req.body.shippingAddress,
                    phone: req.body.phone,
                    email: req.profile.email,
                },
                products: thisProducersProducts,
            })
        }

        // sending mail to customers
        sendEmailToCustomer(req.profile.email, {
            products,
            address: req.body.shippingAddress,
            amount: basket.TotalPrice
        });

        res.send(order);
    } catch (error) {
        res.status(400).send(error);
    }
};