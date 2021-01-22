const express = require("express")
const router = express.Router()

const { favoriteById, add, list, remove } = require("../controllers/favorite");
const { requireSignin, isAuth} = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post('/addFavorite/:userId', requireSignin, isAuth, add )
router.get('/getFavorite/:userId', requireSignin, isAuth, list )
router.delete('/deleteFavorite/:favoriteId/:userId', requireSignin, isAuth, remove)

router.param('userId',userById )
router.param('favoriteId',favoriteById )

module.exports = router;