const express = require('express')
const router = express.Router()
const Users = require('../models/user')
const { SignUp, SignIn, requireSignIn } = require('../controllers/auth')

router.post('/signin',SignIn)
router.post('/signup',SignUp)
// router.post('/profile', requireSignIn ,(req,res) => {
//     res.status(200).json({user: 'Profile'})
// })

module.exports = router