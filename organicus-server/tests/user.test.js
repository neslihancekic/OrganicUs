const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const mongoose = require('mongoose')
const { customerOne, setupDatabaseUser } = require('./fixtures/userDb')

beforeEach(setupDatabaseUser)
jest.setTimeout(10000)

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/api/signup')
        .send({
            firstName: 'Elon',
            lastName: 'Musk',
            email: 'elon@gmail.com',
            password: 'Qwerty1234'
        })
        .expect(201)

    // is really created?
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            firstName: 'Elon',
            lastName: 'Musk',
            email: 'elon@gmail.com'
        }
    })

    // password is hashed?
    expect(user.password).not.toBe('Qwerty1234')

})

test('Should not signup if email is already taken', async () => {
    await request(app)
        .post('/api/signup')
        .send({
            firstName: customerOne.firstName,
            lastName: customerOne.lastName,
            email: customerOne.email,
            password: 'Aa123456'
        })
        .expect(400)
})

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/api/signin')
        .send({
            email: customerOne.email,
            password: customerOne.password
        })
        .expect(200)

    expect(response.body).toMatchObject({
        user: {
            firstName: customerOne.firstName,
            lastName: customerOne.lastName,
            email: customerOne.email,
            role: "Customer"
        }
    })
})

test('Should not signin if non existing user provided', async () => {
    await request(app)
        .post('/api/signin')
        .send({
            email: "nouser@gmail.com",
            password: "123123123qwe"
        })
        .expect(400)
})

test('Should not signin if password is wrong', async () => {
    await request(app)
        .post('/api/signin')
        .send({
            email: customerOne.email,
            password: "123123123qwe"
        })
        .expect(401)
})

test('Should get user info', async () => {
    const response = await request(app)
        .get(`/api/user/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .expect(200)

    expect(response.body).toMatchObject({
        firstName: customerOne.firstName,
        lastName: customerOne.lastName,
        email: customerOne.email,
        role: "Customer"
    })
})

test('Should not get user info if not authorized', async () => {
    await request(app)
        .get(`/api/user/${customerOne._id}`)
        .expect(401)
})

test('Should update user info', async () => {
    const response = await request(app)
        .put(`/api/user/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            firstName: "yeni"
        })
        .expect(200)

    expect(response.body).toMatchObject({
        firstName: "yeni",
        lastName: customerOne.lastName,
        email: customerOne.email,
        role: "Customer"
    })

    const user = await User.findById(customerOne._id)
    expect(user.firstName).toBe("yeni")
})

test('Should not update user info if not authorized', async () => {
    const response = await request(app)
        .put(`/api/user/${customerOne._id}`)
        .send({
            firstName: "yeni"
        })
        .expect(401)
})


afterAll(done => {
    mongoose.connection.close()
    done()
})