const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../models/user')
const Complaint = require('../../models/complaint')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    firstName: 'Test',
    lastName: 'Customer',
    role: 'Customer',
    email: 'test@gmail.com',
    password: 'Aa123456',
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
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


const setupDatabaseComplaint = async () => {
    await User.deleteMany()
    await Complaint.deleteMany();
    await new User(userOne).save()
    await new User(producerOne).save()
}

module.exports = {
    userOne,
    producerOne,
    setupDatabaseComplaint
}