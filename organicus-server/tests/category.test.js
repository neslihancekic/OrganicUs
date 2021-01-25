const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Category = require('../models/category')
const { producerOne, categoryOne, productOne, setupDatabaseCategory } = require('./fixtures/categoryDb')

beforeEach(setupDatabaseCategory)
jest.setTimeout(10000)

test('Everyone one can see categories', async () => {
    const response = await request(app)
        .get(`/api/getCategory/${categoryOne._id}`)
        .expect(200)

    expect(response.body.name).toBe(categoryOne.name)
})

test('Everyone can list all categories', async () => {
    const response = await request(app)
        .get(`/api/categories`)
        .expect(200)

    expect(response.body.data.length).toBe(1)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})