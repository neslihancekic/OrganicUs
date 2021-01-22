const express = require("express")
const router = express.Router()

const { requireSignin, isAuth} = require("../controllers/auth");
const { create, list} = require("../controllers/message");
const { userById } = require("../controllers/user");
const { productById } = require("../controllers/product");

//router.get('/getCategory/:categoryId', read)
router.post('/createMessage/:userId', requireSignin, isAuth, create )
router.get('/getMessages/:productId/:userId',  requireSignin, isAuth, list)

router.param('userId',userById ) 
router.param('productId',productById )

module.exports = router;
