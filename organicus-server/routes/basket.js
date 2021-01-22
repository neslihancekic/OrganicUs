const express = require("express")
const router = express.Router()

const { userById } = require("../controllers/user")
const { requireSignin, isAuth } = require("../controllers/auth")
const { getBasket, addBasketLine, updateBasketLine, removeBasketLine, removeBasket, confirmBasket } = require('../controllers/basket')

router.get('/basket/:userId', requireSignin, isAuth, getBasket)
router.post('/basket/:userId', requireSignin, isAuth, addBasketLine)
router.patch('/basket/:userId',  requireSignin, isAuth, updateBasketLine)
router.delete('/basket/:userId', requireSignin, isAuth, removeBasketLine)
router.delete('/basket/:userId/all', requireSignin, isAuth, removeBasket)
router.post('/basket/:userId/confirm',  requireSignin, isAuth, confirmBasket)

router.param('userId', userById)

module.exports = router;
