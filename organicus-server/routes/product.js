const express = require("express")
const router = express.Router()

const { create, productById, read, remove, update, list, filter, listBySearch, picture,producerProducts} = require("../controllers/product");
const { requireSignin, isAuth, isProducer } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { categoryById} = require("../controllers/category");

router.get('/getProduct/:productId', read)
router.post('/createProduct/:userId', requireSignin, isAuth, isProducer, create )
router.delete('/deleteProduct/:productId/:userId', requireSignin, isAuth, isProducer, remove)
router.put('/updateProduct/:productId/:userId', requireSignin, isAuth, isProducer, update)
router.get('/products', list)
router.get('/products/filterBy/:categoryId', filter)
router.get('/products/producer/:userId', producerProducts)
router.post("/products/searchBy", listBySearch);
router.get("/getProduct/Picture/:productId", picture);

router.param('userId',userById )
router.param('categoryId',categoryById )
router.param('productId',productById )

module.exports = router;
