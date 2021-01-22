const express = require("express")
const router = express.Router()

const { requireSignin, isAuth} = require("../controllers/auth");
const { commentById ,create, list , remove} = require("../controllers/comment");
const { userById } = require("../controllers/user");
const { productById } = require("../controllers/product");

//router.get('/getCategory/:categoryId', read)
router.post('/createComment/:productId/:userId', requireSignin, isAuth, create)
router.get('/getComment/:productId', list)
router.delete('/deleteComment/:commentById/:userId', requireSignin, isAuth, remove)

router.param('userId',userById )
router.param('productId',productById )
router.param('commentById',commentById )

module.exports = router;