const express = require('express')
const { createProduct } = require('../controllers/product')
const {requireSignIn, adminMiddleware} = require('../middleware/auth')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const router = express.Router()

router.post('/product/create',requireSignIn,adminMiddleware,upload.single('productImages'),createProduct)

module.exports = router