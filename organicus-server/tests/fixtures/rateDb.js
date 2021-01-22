const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const Product = require('../../models/product')
const Category = require('../../models/category')

const customerOneId = new mongoose.Types.ObjectId()
const customerOne = {
    _id: customerOneId,
    firstName: 'Test',
    lastName: 'Customer',
    role: 'Customer',
    email: 'test@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: customerOneId }, process.env.JWT_SECRET)
}

const producerOneId = new mongoose.Types.ObjectId()
const producerOne = {
    _id: producerOneId,
    firstName: 'Test2',
    lastName: 'Producer',
    role: 'Producer',
    email: 'test2@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: producerOneId }, process.env.JWT_SECRET)
}

const categoryOneId = new mongoose.Types.ObjectId()
const categoryOne = {
    _id: categoryOneId,
    name: "Test Category",
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



const setupDatabaseRate = async () => {
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await new User(customerOne).save()
    await new User(producerOne).save()
    await new Category(categoryOne).save()
    await new Product(productOne).save()
}

module.exports = {
    customerOne,
    producerOne,
    categoryOne,
    productOne,
    setupDatabaseRate
}