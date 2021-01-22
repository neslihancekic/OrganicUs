const request = require('supertest')
const app = require('../app')
const Favorite = require('../models/favorite')
const mongoose = require('mongoose')
const { customerOne, producerOne, productOne, productTwo, favoriteOne, setupDatabaseFavorite, } = require('./fixtures/favoriteDb')

beforeEach(setupDatabaseFavorite)
jest.setTimeout(10000)

test('Adding product to favorite list', async () => {
    const response = await request(app)
        .post(`/api/addFavorite/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .send({
            ProductId: productTwo._id
        })
        .expect(200)

    const favorite = await Favorite.findById(response.body.data._id)
    expect(favorite).not.toBeNull()
})

test('Remove product from favorite list', async () =>{
    await request(app)
        .delete(`/api/deleteFavorite/${favoriteOne._id}/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .expect(200)
        
    const favorite = await Favorite.findById(favoriteOne._id)
    expect(favorite).toBeNull()
})

test('List favorite products', async () =>{
    const response = await request(app)
        .get(`/api/getFavorite/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .expect(200)

    const favorite = await Favorite.find({
        UserId: customerOne._id
    })

    expect(response.body.length).toBe(1)
})

afterAll(done => {
    mongoose.connection.close()
    done()
})