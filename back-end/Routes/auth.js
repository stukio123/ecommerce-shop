const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const { SignUp, SignIn, requireSignIn } = require('../controllers/auth')
const { check } = require('express-validator')
const { validateSignupRequest, validateSighinRequest, isRequestValidated } = require('../middleware/auth')

router.post('/signin',validateSighinRequest,isRequestValidated,SignIn)
router.post('/signup',validateSignupRequest,isRequestValidated,SignUp)
// router.post('/profile', requireSignIn ,(req,res) => {
//     res.status(200).json({user: 'Profile'})
// })

module.exports = router