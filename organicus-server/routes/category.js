const express = require("express")
const router = express.Router()

const { create,categoryById, read, update, remove, list} = require("../controllers/category");
const { requireSignin, isAuth, isProducer } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get('/getCategory/:categoryId', read)
router.post('/createCategory/:userId', requireSignin, isAuth, isProducer, create )
router.put('/updateCategory/:categoryId/:userId', requireSignin, isAuth, isProducer, update )
router.delete('/deleteCategory/:categoryId/:userId', requireSignin, isAuth, isProducer, remove )
router.get('/categories', list)

router.param('categoryId',categoryById )
router.param('userId',userById )

module.exports = router;
