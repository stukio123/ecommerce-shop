const express = require('express')
const router = express.Router()
const Users = require('../../models/user')
const { SignIn, requireSignIn } = require('../../controllers/admin/auth')

router.post('/admins/signin',SignIn)
//router.post('/admins/signup',SignUp)


module.exports = router