const request = require('supertest')
const app = require('../app')
const Product = require('../models/product')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const mongoose = require('mongoose')
const {
    customerOne,
    producerOne,
    categoryOne,
    productOne,
    productTwo,
    productThree,
    orderOne,
    orderItemOne,
    orderItemTwo,
    orderItemThree,
    setupDatabaseOrder
} = require('./fixtures/orderDb')

beforeEach(setupDatabaseOrder)
jest.setTimeout(10000)

test('Customer should get details of his/her order', async () => {
    const response = await request(app)
        .get(`/api/order/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            orderId: orderOne._id
        })
        .expect(200)

    expect(response.body.order).toMatchObject({
        UserId: customerOne._id.toString(),
        Phone: orderOne.Phone,
        ShippingAddress: orderOne.ShippingAddress
    })

    expect(response.body.orderItems.length).toBe(3)
})

test('Producer should update details of orders', async () => {
    const response = await request(app)
        .put(`/api/order/${producerOne._id}`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .send({
            orderItemId: orderItemOne,
            shipped: true,
            prepearing: true
        })
        .expect(200)

    expect(response.body).toMatchObject({
        Shipped: true,
        Prepearing: true
    })

    const newOrderItemOne = await OrderItem.findById(orderItemOne._id)
    expect(newOrderItemOne.Shipped).toBe(true)
    expect(newOrderItemOne.Prepearing).toBe(true)
})

test("Customer should get list of his/her orders", async () => {
    const response = await request(app)
        .get(`/api/order/${customerOne._id}/list`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .expect(200)

    expect(response.body.length).toBe(1)
    expect(response.body[0]).toMatchObject({
        orderId: orderOne._id.toString(),
        Phone: orderOne.Phone,
        ShippingAddress: orderOne.ShippingAddress
    })
})

test("Producer should get list of orders", async () => {
    const response = await request(app)
        .get(`/api/order/${producerOne._id}/listProducer`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .expect(200)

    expect(response.body.length).toBe(3)
    expect(response.body[0]).toMatchObject({
        customer: {
            customerId: customerOne._id.toString(),
            email: customerOne.email
        }, order: {
            OrderContactPhone: orderOne.Phone,
            Quantity: 2,
            Shipped: false
        }
    })
})

test('Producer should get earnings', async () => {
    const response = await request(app)
        .get(`/api/order/${producerOne._id}/totalEarning`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .expect(200)

    expect(response.body).toMatchObject([{
        TotalEarning: 255
    }])
})

test('Producer should get total sales', async () => {
    const response = await request(app)
        .get(`/api/order/${producerOne._id}/totalSold`)
        .set('Authorization', `Bearer ${producerOne.token}`)
        .expect(200)

    expect(response.body).toMatchObject([{
        TotalQuantity: 2 + 3 + 1
    }])
})

afterAll(done => {
    mongoose.connection.close()
    done()
})