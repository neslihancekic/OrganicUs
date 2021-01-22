const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const Category = require('../../models/category')
const Product = require('../../models/product')
const Basket = require('../../models/basket')
const BasketLine = require('../../models/basketLine')

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

const basketOneId = new mongoose.Types.ObjectId()
const basketOne = {
    _id: basketOneId,
    UserId: customerOne._id
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

const productFourId = new mongoose.Types.ObjectId()
const productFour = {
    _id: productFourId,
    Title: "Test Item4",
    CategoryID: categoryOneId,
    ProducerID: producerOneId,
    Price: 30,
    Stock: 0
}

const basketLineOneId = new mongoose.Types.ObjectId()
const basketLineOne = {
    _id: basketLineOneId,
    BasketId: basketOne._id,
    ProductId: productOne._id
}

const basketLineTwoId = new mongoose.Types.ObjectId()
const basketLineTwo = {
    _id: basketLineTwoId,
    BasketId: basketOne._id,
    ProductId: productTwo._id,
    Quantity: 3
}

const basketLineThreeId = new mongoose.Types.ObjectId()
const basketLineThree = {
    _id: basketLineThreeId,
    BasketId: basketOne._id,
    ProductId: productThree._id,
    Quantity: 2
}

const setupDatabaseBasket = async () => {
    await User.deleteMany()
    await Basket.deleteMany()
    await BasketLine.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()

    await new User(customerOne).save()
    await new User(producerOne).save()
    await new Basket(basketOne).save()
    await new Category(categoryOne).save()
    await new Product(productOne).save()
    await new Product(productTwo).save()
    await new Product(productThree).save()
    await new Product(productFour).save()
    await new BasketLine(basketLineOne).save()
    await new BasketLine(basketLineTwo).save()
    await new BasketLine(basketLineThree).save()
}

module.exports = {
    customerOne,
    producerOne,
    basketOne,
    categoryOne,
    productOne,
    productTwo,
    productThree,
    productFour,
    basketLineOne,
    basketLineTwo,
    basketLineThree,
    setupDatabaseBasket
}