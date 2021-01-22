const mongoose = require('mongoose')
const crypto = require('crypto')
const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema({
        firstName:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        lastName:{
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        }, 
        email:{
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        hashedPassword:{
            type: String,
            required: true,
        },
        salt: String,
        role:{
            type: String, //Customer, Producer
            default: "Customer",
        },
        address:{
            type: String, 
            default:""
        },
        phone:{
            type: Number, 
            default:0
        },
        Star:{ //average
            type: Number,
            trim: true,
            maxlength: 32,
            default:0
        },
        RatedCount:{ //oylayan kişi sayısı
            type: Number,
            trim: true,
            maxlength: 32,
            default:0
        },
        history:{
            type: Array,
            default:[]
        }
    },
    {timestamps: true}
);
// virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashedPassword = this.encryptPassword(password)
})
.get(function(){
    return this._password
});

userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    encryptPassword: function(password){
        if(!password) return ""
        try{
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex')
        }catch(err){
            return "";
        }
    }
};
module.exports = mongoose.model("User",userSchema);