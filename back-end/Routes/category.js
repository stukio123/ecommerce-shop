const express = require('express')
const { requireSignIn } = require('../middleware/auth')
const { addCategory, getCategory, delCategory, editCategory } = require('../controllers/category')
const { adminMiddleware } = require('../middleware/auth')
const multer = require('multer')
const upload = multer()
const router = express.Router()

router.post('/category/create',upload.none(),requireSignIn, adminMiddleware, addCategory)
router.get('/category/getcategory',getCategory)
router.delete('/category/delete/:id',requireSignIn,adminMiddleware,delCategory)
router.put('/category/update',requireSignIn,adminMiddleware,editCategory)
module.exports = router