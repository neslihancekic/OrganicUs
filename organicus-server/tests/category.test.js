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

test('Producers can create new category', async () => {
    const response = await request(app)
        .post(`/api/createCategory/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .send({
            name: "new test category"
        })
        .expect(200)

    expect(response.body.data.name).toBe("new test category")

    const category = await Category.findById(response.body.data._id)
    expect(category).not.toBeNull()
    expect(category.name).toBe("new test category")
})

test('Producers can update existing category', async () => {
    const response = await request(app)
        .put(`/api/updateCategory/${categoryOne._id}/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .send({
            name: "updated test category"
        })
        .expect(200)

        expect(response.body.data.name).toBe("updated test category")

        const category = await Category.findById(categoryOne._id)
        expect(category).not.toBeNull()
        expect(category.name).toBe("updated test category")
})

test('Producers can delete existing category', async () => {
    await request(app)
        .delete(`/api/deleteCategory/${categoryOne._id}/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .expect(200)

        const category = await Category.findById(categoryOne._id)
        expect(category).toBeNull()
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