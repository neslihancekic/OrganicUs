const request = require('supertest')
const app = require('../app')
const Message = require('../models/message')
const mongoose = require('mongoose')
const { customerOne, producerOne, productOne, categoryOne, messageOne, setupDatabaseMessage, } = require('./fixtures/messageDb')

beforeEach(setupDatabaseMessage)
jest.setTimeout(10000)

test('Customer should able to send message to producer', async () => {
    const response = await request(app)
        .post(`/api/createMessage/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            SenderId: customerOne._id,
            CustomerId: customerOne._id,
            ProductId: productOne._id,
            Message: "Test Message",
        })
        .expect(200)

        const message = await Message.findById(response.body.data._id)
        expect(message.Message).toBe("Test Message")
})

//////////////////////TEST LIST MESSAGES////////////


test('Producer should able to answer the customers message', async () =>{
    const response = await request(app)
    .post(`/api/createMessage/${producerOne._id}`)
    .set('Authorization', `Bearer ${producerOne.token}`)
    .send({
        SenderId: producerOne._id,
        CustomerId: customerOne._id,
        ProductId: productOne._id,
        Message: "Test Answer",
    })
    .expect(200)

    const message = await Message.findById(response.body.data._id)
    expect(message.Message).toBe("Test Answer")
})

afterAll(done => {
    mongoose.connection.close()
    done()
})