const express = require('express')
const router = express.Router()
const Users = require('../../models/user')
const { SignIn, SignOut} = require('../../controllers/admin/auth')
const {adminMiddleware,validateSighinRequest,isRequestValidated, requireSignIn} = require('../../middleware/auth')

router.post('/admin/signin', validateSighinRequest, isRequestValidated,SignIn)
router.post('/admin/signout',requireSignIn,SignOut)

module.exports = router