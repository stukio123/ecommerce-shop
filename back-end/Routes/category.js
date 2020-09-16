const express = require('express')
const { requireSignIn } = require('../middleware/auth')
const { addCategory, getCategory } = require('../controllers/category')
const { adminMiddleware } = require('../middleware/auth')
const router = express.Router()

router.post('/category/create',requireSignIn, adminMiddleware, addCategory)
router.get('/category/getcategory',getCategory)

module.exports = router