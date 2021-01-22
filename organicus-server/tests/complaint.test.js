
const request = require('supertest')
const app = require('../app')
const Complaint = require('../models/complaint')
const User = require('../models/user')
const mongoose = require('mongoose')
const { userOne, producerOne, setupDatabaseComplaint } = require('./fixtures/complaintDb')

beforeEach(setupDatabaseComplaint)
jest.setTimeout(10000)

test('Customer should able to send complaint about producer', async () => {
    const response = await request(app)
        .post(`/api/createComplaint/${userOne._id}`)
        .set('Authorization', `Bearer ${userOne.token}`)
        .send({
            UserId: userOne._id,
            ProducerId: producerOne._id,
            Title: "This is my title",
            Complaint: "Sikayetciyim hakim bey"

        })
        .expect(200)
        
    const complaint = await Complaint.findById(response.body.data._id)
    expect(complaint).not.toBeNull()
    expect(complaint).toMatchObject({
        Title: "This is my title",
        Complaint: "Sikayetciyim hakim bey"
    })
        
})

afterAll(done => {
    mongoose.connection.close()
    done()
})