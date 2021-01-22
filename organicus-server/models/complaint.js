const mongoose = require('mongoose');
const User = require('../models/user');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {ObjectId} = mongoose.Schema

const complaintSchema = new mongoose.Schema({
        UserId:{
            type: ObjectId,
            ref: 'User',
            required: true
        },
        ProducerId:{
            type: ObjectId,
            ref: 'Producer',
            required: true
        },
        Complaint:{
            type: String,
            trim: true,
            required: true,
            maxlength: 500
        },
        Title:{
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        }
    },
    {timestamps: true}
);

complaintSchema.pre("save",async function(done){
    const user = await User.findById(this.UserId).exec();
    const producer = await User.findById(this.ProducerId).exec();
    const email = user.email;
    const emailData = {
        to: 'organicus.team@gmail.com',
        from: 'organicus.team@gmail.com',
        subject: `There is a Complaint!`,
        html: `
        <h1>Title: ${this.Title}</h1>
        <h2>User Mail: ${email} </h2>
        <h2>Producer Mail: ${producer.email}</h2>
        <p>Complaint: ${this.Complaint}</p>
    `
    };

    sgMail.send(emailData)
})
module.exports = mongoose.model("Complaint",complaintSchema);