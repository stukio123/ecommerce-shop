const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('Họ và tên lót không được để trống'),
    check('lastName').notEmpty().withMessage('Tên không được để trống'),
    check('email').isEmail().withMessage('Email không hợp lệ'),
    check('password').isLength({min: 8}).withMessage('Mật khẩu phải nhiều hơn 8 ký tự')
]

exports.validateSighinRequest = [
    check('email').isEmail().withMessage('Email không hợp lệ'),
    check('password').isLength({min: 8}).withMessage('Mật khẩu phải nhiều hơn 8 ký tự')
]

exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0){
        console.log( typeof errors.array().length)
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next()
}

exports.requireSignIn = (req,res,next) =>{

    if(req.headers.authorization){
        const token =req.headers.authorization.split(" ")[1]
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.user = user
    }else{
        return res.status(500).json({message: 'Authorization required'})
    }
    next()
}

exports.userMiddleware = (req,res,next) => {
    console.log(req.user.role)
    if(req.user.role != 'Custommer')
        return res.status(400).json({message: 'User access denied'})
    next()
}
exports.adminMiddleware = (req,res,next) => {
    console.log(req.user.role)
    if(req.user.role != 'Admin')
        return res.status(400).json({message: 'Admin access denied'})
    next()
}