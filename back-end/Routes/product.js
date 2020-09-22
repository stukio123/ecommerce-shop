const express = require('express')
const router = express.Router()
const { createProduct } = require('../controllers/product')
const {requireSignIn, adminMiddleware} = require('../middleware/auth')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req,file,callback){
        callback(null, shortid.generate()+'.png')
    }
})

const upload = multer({storage})

router.post('/products/create',requireSignIn,adminMiddleware,upload.array('productImage'),createProduct)

module.exports = router