const express = require('express')
const router = express.Router()
const { SignUp, SignIn } = require('../controllers/auth')
const { validateSignupRequest, validateSighinRequest, isRequestValidated } = require('../middleware/auth')

router.post('/signin',validateSighinRequest,isRequestValidated,SignIn)
router.post('/signup',validateSignupRequest,isRequestValidated,SignUp)
// router.post('/profile', requireSignIn ,(req,res) => {
//     res.status(200).json({user: 'Profile'})
// })

module.exports = router