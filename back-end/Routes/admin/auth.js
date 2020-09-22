const express = require('express')
const router = express.Router()
const Users = require('../../models/user')
const { SignIn} = require('../../controllers/admin/auth')
const {adminMiddleware,validateSighinRequest,isRequestValidated} = require('../../middleware/auth')

router.post('/admins/signin',validateSighinRequest, isRequestValidated,SignIn)
//router.post('/admins/signup',SignUp)

module.exports = router