const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Category = require('../models/category')
const Product = require('../models/product')
const mongoose = require('mongoose')
const { customerOne, producerOne, categoryOne, productOne, setupDatabaseRate } = require('./fixtures/rateDb')

beforeEach(setupDatabaseRate)

test('Customer should able to rate producer', async () => {
    const response = await request(app)
    .patch(`/api/rateProducer/${customerOne._id}`)
    .set('Authorization', `Bearer ${customerOne.token}`)
    .send({
        ProducerId : producerOne._id,
        Star : "5",
    })
    .expect(200)

    const producer = await User.findById(producerOne._id)
    expect(producer.Star).toBe(5)
})

test('Customer should able to rate product', async () => {
    const response = await request(app)
    .patch(`/api/rateProduct/${customerOne._id}`)
    .set('Authorization', `Bearer ${customerOne.token}`)
    .send({
        ProductId : productOne._id,
        Star : "5",
    })
    .expect(200)

    const product = await Product.findById(productOne._id)
    expect(product.Star).toBe(5)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})
