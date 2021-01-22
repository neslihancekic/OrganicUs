const express = require("express")
const router = express.Router()

const { requireSignin, isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { rateProducer,rat, rateProduct } = require("../controllers/rate");

router.patch('/rateProduct/:userId', requireSignin, isAuth, rateProduct )
router.patch('/rateProducer/:userId', requireSignin, isAuth, rateProducer )

router.param('userId',userById )

module.exports = router;