const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Product = require('../models/product')
const { producerOne, producerTwo, categoryOne, productOne, setupDatabaseProduct } = require('./fixtures/productDb')

beforeEach(setupDatabaseProduct)
jest.setTimeout(10000)

test('Should get product', async () => {
    const response = await request(app)
        .get(`/api/getProduct/${productOne._id}`)
        .expect(200)

    const product = await Product.findById(response.body._id)
    expect(product).not.toBeNull()

    expect(response.body).toMatchObject({
        Title: product.Title,
        ProducerID: producerOne._id.toString(),
        CategoryID: categoryOne._id.toString()
    })
})

test('Producer should create new product', async () => {
    const response = await request(app)
        .post(`/api/createProduct/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .field("Title", "New Test Product")
        .field("CategoryID", categoryOne._id.toString())
        .field("ProducerID", producerOne._id.toString())
        .field("Price", 12)
        .field("Stock", 3)
        .expect(200)

    const product = await Product.findById(response.body.result._id)
    expect(product).not.toBeNull()

    expect(response.body.result).toMatchObject({
        Title: "New Test Product",
        CategoryID: categoryOne._id.toString(),
        ProducerID: producerOne._id.toString(),
        Price: 12,
        Stock: 3
    })
})

test('Producer should delete product', async () => {
    await request(app)
        .delete(`/api/deleteProduct/${productOne._id}/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .expect(200)

    const product = await Product.findById(productOne._id)
    expect(product).toBeNull()
})

test('Producer should not delete products that doesnt belong to him/her', async () => {
    const response = await request(app)
        .delete(`/api/deleteProduct/${productOne._id}/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerTwo.token}`)
        .expect(403)

    const product = await Product.findById(productOne._id)
    expect(product).not.toBeNull()
})

test('Producer should update its products', async () => {
    const response = await request(app)
        .put(`/api/updateProduct/${productOne._id}/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .field("Title", "Updated Test Product")
        .field("Stock", 99)
        .field("CategoryID", productOne.CategoryID.toString())
        .field("ProducerID", productOne.ProducerID.toString())
        .field("Price", productOne.Price)
        .expect(200)

    const product = await Product.findById(response.body.result._id)
    expect(product).not.toBeNull()

    expect(response.body.result).toMatchObject({
        Title: "Updated Test Product",
        Stock: 99,
        Price: productOne.Price
    })
})

test('Everyone can list all products', async () => {
    const response = await request(app)
        .get(`/api/products`)
        .expect(200)

    expect(response.body.length).toBe(1)
})

test('Everyone can filter products by category', async () => {
    const response = await request(app)
        .get(`/api/products/filterBy/${categoryOne._id}`)
        .expect(200)

    expect(response.body.length).toBe(1)
})

test('Everyone can filter products by producer', async () => {
    const response = await request(app)
        .get(`/api/products/producer/${producerOne._id}`)
        .expect(200)

    expect(response.body.length).toBe(1)
})

test('Everyone can search products', async () => {
    const response = await request(app)
        .post(`/api/products/searchBy`)
        .send({
            Title: "Test Item"
        })
        .expect(200)

    expect(response.body.size).toBe(1)
    expect(response.body.data[0]).toMatchObject({
        Title: productOne.Title,
        ProducerID: producerOne._id.toString(),
    })
})

test('Search result should be 404 if filter result is null', async () => {
    const response = await request(app)
        .post(`/api/products/searchBy`)
        .send({
            filters: {
                Title: "Noooo item"
            }
        })
        .expect(200)

    expect(response.body.size).toBe(0)
    expect(response.body.data.length).toBe(0)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})