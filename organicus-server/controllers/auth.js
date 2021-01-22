const User = require('../models/user');
const jwt = require('jsonwebtoken'); //generate signed token
const expressJwt = require('express-jwt'); // authorization check

const {errorHandler} = require("../helpers/dbErrorHandler");

exports.signUp = (req,res) => {
    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        user.salt = undefined
        user.hashedPassword = undefined
        res.status(201).json({
            user
        });

    });
};

exports.signIn = (req,res) => {
    const{email,password} = req.body
    User.findOne({email}, ( error,user) => {
        //user exist control
        if (error|| !user){
            return res.status(400).json({
                error: "User with that email does not exist. Please signup."
            });
        }
        //authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Email and password do not matched.'
            });
        }
        //generate a signed token with user id and secret
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
        //persist the token as t in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client
        const {_id,firstName,lastName,email,role}=user
        return res.json({token, user: {_id, email,firstName,lastName,role}})
    });
};

exports.signOut = (req,res) => {
    res.clearCookie('t')
    res.json({ message: "Signout Success"})
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

exports.isAuth = (req,res,next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({
            error: "Access denied."
        });
    }
    next();
};

exports.isProducer = (req,res,next) => {
    if(req.profile.role === "Customer"){
        return res.status(403).json({
            error: "Producer resource. Access Denied"
        });
    }
    next();
};
