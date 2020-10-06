const express = require('express')
const {addItemtoCart} = require('../controllers/cart')
const { requireSignIn, userMiddleware } = require('../middleware/auth')
const router = express.Router()

router.post('/user/cart/addtocart',requireSignIn,userMiddleware,addItemtoCart)

module.exports = router