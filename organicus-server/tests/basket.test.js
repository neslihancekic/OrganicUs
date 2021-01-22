const request = require('supertest')
const app = require('../app')
const Basket = require('../models/basket')
const Product = require('../models/product')
const Order = require('../models/order')
const mongoose = require('mongoose')
const {
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
} = require('./fixtures/basketDb')

beforeEach(setupDatabaseBasket)
jest.setTimeout(10000)

test('Should get basket of user', async () => {
    const response = await request(app)
        .get(`/api/basket/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .expect(200)

    expect(response.body.basket).toMatchObject({
        TotalPrice: 5 + 12 * 3 + 85 * 2
    })

    expect(response.body.basketLines.length).toBe(3)

    const basket = await Basket.findById(response.body.basket._id)
    expect(basket).not.toBeNull()
    expect(basket.TotalPrice).toBe(5 + 12 * 3 + 85 * 2)
})

test('Should not get basket of user if not authorized', async () => {
    await request(app)
        .get(`/api/basket/${customerOne._id}`)
        .expect(401)
})

test('Should add new item to basket of user', async () => {
    const response = await request(app)
        .post(`/api/basket/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            ProductId: productOne,
            Quantity: 2
        })
        .expect(200)

    expect(response.body).toMatchObject({
        Quantity: 2
    })

    const basket = await Basket.findById(response.body.BasketId)
    expect(basket).not.toBeNull()
    expect(basket.TotalPrice).toBe(5 + 12 * 3 + 85 * 2 + 5 * 2)
})

test('User shouldnt be able to add item with not enough stock to basket', async () => {
    await request(app)
        .post(`/api/basket/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            ProductId: productFour._id,
            Quantity: 2
        })
        .expect(400)

    const basket = await Basket.findById(basketOne._id)
    expect(basket.TotalPrice).toBe(5 + 12 * 3 + 85 * 2)
})

test('User should update its basket', async () => {
    const response = await request(app)
        .patch(`/api/basket/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            basketLineId: basketLineThree._id,
            Quantity: 1
        })
        .expect(200)

    expect(response.body).toMatchObject({
        Quantity: 1
    })

    const basket = await Basket.findById(response.body.BasketId)
    expect(basket).not.toBeNull()
    expect(basket.TotalPrice).toBe(5 + 12 * 3 + 85 * 1)
})

test('User shouldnt be able to update item with not enough stock to basket', async () => {
    await request(app)
        .patch(`/api/basket/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            basketLineId: basketLineOne._id,
            Quantity: 500
        })
        .expect(400)

    const basket = await Basket.findById(basketOne._id)
    expect(basket).not.toBeNull()
    expect(basket.TotalPrice).toBe(5 + 12 * 3 + 85 * 2)
})

test('User should be able to delete item from basket', async () => {
    const response = await request(app)
        .delete(`/api/basket/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            basketLineId: basketLineOne._id,
        })
        .expect(200)

    const basket = await Basket.findById(basketOne._id)
    expect(basket).not.toBeNull()
    expect(basket.TotalPrice).toBe(12 * 3 + 85 * 2)
})

test('User should be able to delete basket', async () => {
    const response = await request(app)
        .delete(`/api/basket/${customerOne._id}/all`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            basketLineId: basketLineOne._id,
        })
        .expect(200)

    const basket = await Basket.findById(basketOne._id)
    expect(basket).toBeNull()
})

test('User should be able to confirm basket', async () => {
    const response = await request(app)
        .post(`/api/basket/${customerOne._id}/confirm`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            shippingAddress: "istanbul",
            billingAddress: "kadikoy",
            phone: 5555555
        })
        .expect(200)

    expect(response.body).toMatchObject({
        Phone: 5555555,
        ShippingAddress: "istanbul",
        BillingAddress: "kadikoy"
    })

    const order = await Order.findById(response.body._id);
    expect(order).toMatchObject({
        UserId: customerOne._id,
        Phone: 5555555,
        ShippingAddress: "istanbul",
        BillingAddress: "kadikoy"
    })

    const productOneUpdated = await Product.findById(productOne._id)
    expect(productOneUpdated.Stock).toBe(9)

    const productTwoUpdated = await Product.findById(productTwo._id)
    expect(productTwoUpdated.Stock).toBe(17)

    const productThreeUpdated = await Product.findById(productThree._id)
    expect(productThreeUpdated.Stock).toBe(3)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})