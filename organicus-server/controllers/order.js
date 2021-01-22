const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product');
const User = require('../models/user');
const lodash = require('lodash');

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.body.orderId);
        if (!order)
            throw new Error('Order doesnt exist');

        const orderItems = await OrderItem.find({ OrderId: order._id });

        res.send({ order, orderItems });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.editOrderStatus = async (req, res) => {
    try {
        const item = req.body
        const orderItem = await OrderItem.findById(item.orderItemId);
        const product = await Product.findById(orderItem.ProductId);
        console.log(product.ProducerID, req.profile._id);

        orderItem.Shipped = item.shipped || orderItem.Shipped;
        orderItem.Prepearing = item.prepearing || orderItem.Prepearing;

        await orderItem.save();
        res.send(orderItem);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

exports.listOrders = async (req, res) => {
    try {
        const orders = await Order.find({ UserId: req.profile._id });
        const orderAndOrderItems = []
        for (const order of orders) {
            const orderItems = await OrderItem.find({ OrderId: order._id });

            const Phone = order.Phone;
            const ShippingAddress = order.ShippingAddress;
            const BillingAddress = order.BillingAddress;

            let TotalPrice = 0;
            for (const orderItem of orderItems) {
                const product = await Product.findById(orderItem.ProductId);
                TotalPrice += product.Price * (100 - product.DiscountPercentage) / 100 * orderItem.Quantity;
            }

            orderAndOrderItems.push({
                orderId: order._id,
                orderItems,
                Phone,
                ShippingAddress,
                BillingAddress,
                TotalPrice
            });
        }

        res.send(orderAndOrderItems);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

exports.listOrdersProducer = async (req, res) => {
    try {
        const thisProducersProducts = await Product.find({ ProducerID: req.profile._id });

        const orderItems = []
        for (const product of thisProducersProducts) {
            const orderItemsOfThisProduct = await OrderItem.find({ ProductId: product._id });
            orderItems.push(...orderItemsOfThisProduct);
        }

        const orders = []
        for (const orderItem of orderItems) {
            const order = await Order.findById(orderItem.OrderId);
            const customer = await User.findById(order.UserId);
            const product = await Product.findById(orderItem.ProductId)

            const Price = product.Price * (100 - product.DiscountPercentage) / 100 * orderItem.Quantity;

            orders.push({
                customer: {
                    customerId: customer._id,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    email: customer.email
                },
                order: {
                    OrderContactPhone: order.Phone,
                    OrderId: orderItem._id,
                    ProductId: orderItem.ProductId,
                    Quantity: orderItem.Quantity,
                    ShippingAddress: order.ShippingAddress,
                    BillingAddress: order.BillingAddress,
                    Shipped: orderItem.Shipped,
                    Prepearing: orderItem.Prepearing,
                    createdAt: orderItem.createdAt,
                    Price
                }
            });
        }

        res.send(orders);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

exports.getEarnings = async (req, res) => {
    try {
        const thisProducersProducts = await Product.find({ ProducerID: req.profile._id });

        const orderItems = []
        for (const product of thisProducersProducts) {
            const orderItemsOfThisProduct = await OrderItem.find({ ProductId: product._id });
            orderItems.push(...orderItemsOfThisProduct);
        }

        const orders = []
        let Price = 0
        for (const orderItem of orderItems) {
            const product = await Product.findById(orderItem.ProductId)

            Price = Price + product.Price * (100 - product.DiscountPercentage | 0) / 100 * orderItem.Quantity;

        }
        orders.push({
            TotalEarning: Price
        });

        res.send(orders);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

exports.getTotalSales = async (req, res) => {
    try {
        const thisProducersProducts = await Product.find({ ProducerID: req.profile._id });

        const orderItems = []
        for (const product of thisProducersProducts) {
            const orderItemsOfThisProduct = await OrderItem.find({ ProductId: product._id });
            orderItems.push(...orderItemsOfThisProduct);
        }

        const orders = []
        let Quantity = 0
        for (const orderItem of orderItems) {
            Quantity = Quantity + orderItem.Quantity
        }
        orders.push({
            TotalQuantity: Quantity
        });
        res.send(orders);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}