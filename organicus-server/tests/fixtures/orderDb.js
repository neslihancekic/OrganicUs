const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const Category = require('../../models/category')
const Product = require('../../models/product')
const Order = require('../../models/order')
const OrderItem = require('../../models/orderItem')

const customerOneId = new mongoose.Types.ObjectId()
const customerOne = {
    _id: customerOneId,
    firstName: 'Test',
    lastName: 'Customer',
    email: 'test@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: customerOneId }, process.env.JWT_SECRET)
}

const producerOneId = new mongoose.Types.ObjectId()
const producerOne = {
    _id: producerOneId,
    firstName: 'Test',
    lastName: 'Customer',
    email: 'test2@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: producerOneId }, process.env.JWT_SECRET),
    role: "Producer"
}

const categoryOneId = new mongoose.Types.ObjectId()
const categoryOne = {
    _id: categoryOneId,
    name: "Test Category"
}

const productOneId = new mongoose.Types.ObjectId()
const productOne = {
    _id: productOneId,
    Title: "Test Item",
    CategoryID: categoryOneId,
    ProducerID: producerOneId,
    Price: 5,
    Stock: 10
}

const productTwoId = new mongoose.Types.ObjectId()
const productTwo = {
    _id: productTwoId,
    Title: "Test Item2",
    CategoryID: categoryOneId,
    ProducerID: producerOneId,
    Price: 12,
    Stock: 20
}

const productThreeId = new mongoose.Types.ObjectId()
const productThree = {
    _id: productThreeId,
    Title: "Test Item3",
    CategoryID: categoryOneId,
    ProducerID: producerOneId,
    Price: 100,
    IsDiscounted: true,
    DiscountPercentage: 15,
    Stock: 5
}

const orderOneId = new mongoose.Types.ObjectId()
const orderOne = {
    _id: orderOneId,
    UserId: customerOneId,
    Phone: 5555555,
    ShippingAddress: "istanbul",
    BillingAddress: "istanbul"
}

const orderItemOneId = new mongoose.Types.ObjectId()
const orderItemOne = {
    _id: orderItemOneId,
    OrderId: orderOneId,
    ProductId: productOneId,
    Quantity: 2
}

const orderItemTwoId = new mongoose.Types.ObjectId()
const orderItemTwo = {
    _id: orderItemTwoId,
    OrderId: orderOneId,
    ProductId: productTwoId,
    Quantity: 1
}

const orderItemThreeId = new mongoose.Types.ObjectId()
const orderItemThree = {
    _id: orderItemThreeId,
    OrderId: orderOneId,
    ProductId: productThreeId,
    Quantity: 3
}

const setupDatabaseOrder = async () => {
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await OrderItem.deleteMany()
    await Order.deleteMany()

    await new User(customerOne).save()
    await new User(producerOne).save()
    await new Category(categoryOne).save()
    await new Product(productOne).save()
    await new Product(productTwo).save()
    await new Product(productThree).save()
    await new Order(orderOne).save()
    await new OrderItem(orderItemOne).save()
    await new OrderItem(orderItemTwo).save()
    await new OrderItem(orderItemThree).save()
}

module.exports = {
    customerOne,
    producerOne,
    categoryOne,
    productOne,
    productTwo,
    productThree,
    orderOne,
    orderItemOne,
    orderItemTwo,
    orderItemThree,
    setupDatabaseOrder
}