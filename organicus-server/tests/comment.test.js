const request = require('supertest')
const app = require('../app')
const Comment = require('../models/comment')
const mongoose = require('mongoose')
const { customerOne, productOne, commentOne, categoryOne, producerOne, setupDatabaseComment } = require('./fixtures/commentDb')

beforeEach(setupDatabaseComment)
jest.setTimeout(10000)

test('Customer should able to comment to product', async () => {
    const response = await request(app)
    .post(`/api/createComment/${productOne._id}/${customerOne._id}`)
    .set('Authorization', `Bearer ${customerOne.token}`)
    .send({
        "UserId" : customerOne._id,
        "ProductId" : productOne._id,
        "Comment" : "This is my comment",
    })
    .expect(200)
    const comment = await Comment.findById(response.body.data._id)
    expect (comment.Comment).toBe("This is my comment")
})

test('Customer should be able to see all comment on that product', async () => {
    const response = await request(app)
        .get(`/api/getComment/${productOne._id}`)
        .expect(200)

    const comments = await Comment.find({
        ProductId: productOne._id
    })

    expect(response.body.length).toBe(1)
})


test('Customer should able to delete comment', async () =>{
    await request(app)
        .delete(`/api/deleteComment/${commentOne._id}/${customerOne._id}`)
        .set('Authorization', `Bearer ${customerOne.token}`)
        .expect(200)

    const comment = await Comment.findById(commentOne._id)
    expect(comment).toBeNull()
})


afterAll(done => {
    mongoose.connection.close()
    done()
})