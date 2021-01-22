const express = require("express")
const router = express.Router()

const { userById } = require("../controllers/user")
const { requireSignin, isAuth, isProducer } = require("../controllers/auth")
const { getOrder, editOrderStatus, listOrders, listOrdersProducer , getTotalSales, getEarnings} = require('../controllers/order')

router.get('/order/:userId', requireSignin, isAuth, getOrder)
router.put('/order/:userId', requireSignin, isAuth, isProducer, editOrderStatus)
router.get('/order/:userId/list', requireSignin, isAuth, listOrders)
router.get('/order/:userId/listProducer', requireSignin, isAuth, isProducer, listOrdersProducer)
router.get('/order/:userId/totalEarning', requireSignin, isAuth, isProducer, getEarnings)
router.get('/order/:userId/totalSold', requireSignin, isAuth, isProducer, getTotalSales)

router.param('userId', userById)

module.exports = router
