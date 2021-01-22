const express = require("express")
const router = express.Router()

const { requireSignin, isAuth} = require("../controllers/auth");
const { create } = require("../controllers/complaint");
const { userById } = require("../controllers/user");

//router.get('/getCategory/:categoryId', read)
router.post('/createComplaint/:userId', requireSignin, isAuth, create)

router.param('userId',userById )

module.exports = router;