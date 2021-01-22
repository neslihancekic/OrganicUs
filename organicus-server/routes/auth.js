const express = require("express")
const router = express.Router()

const { 
    signUp , 
    signIn, 
    signOut,
} = require("../controllers/auth");

const { userSignupValidator } = require("../validators")

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

module.exports = router;
