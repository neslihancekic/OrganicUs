const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const Category = require('../../models/category')
const Product = require('../../models/product')

const producerOneId = new mongoose.Types.ObjectId()
const producerOne = {
    _id: producerOneId,
    firstName: 'Test',
    lastName: 'Customer',
    email: 'test@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: producerOneId }, process.env.JWT_SECRET),
    role: "Producer"
}

const producerTwoId = new mongoose.Types.ObjectId()
const producerTwo = {
    _id: producerTwoId,
    firstName: 'Test 2',
    lastName: 'Customer',
    email: 'test2@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: producerTwoId }, process.env.JWT_SECRET),
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

const setupDatabaseProduct = async () => {
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    
    await new User(producerOne).save()
    await new User(producerTwo).save()
    await new Category(categoryOne).save()
    await new Product(productOne).save()
}

module.exports = {
    producerOne,
    producerTwo,
    categoryOne,
    productOne,
    setupDatabaseProduct
}