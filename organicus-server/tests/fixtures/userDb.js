const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')

const customerOneId = new mongoose.Types.ObjectId()
const customerOne = {
    _id: customerOneId,
    firstName: 'Test',
    lastName: 'Customer',
    email: 'test@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: customerOneId }, process.env.JWT_SECRET)
}

const setupDatabaseUser = async () => {
    await User.deleteMany()
    await new User(customerOne).save()
}

module.exports = {
    customerOne,
    setupDatabaseUser
}