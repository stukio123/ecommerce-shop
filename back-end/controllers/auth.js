const Users = require('../models/user')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

exports.SignUp = (req,res,next) => {
    //console.log(req.body)
    Users.findOne({email: req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error})
        if(user)
            return res.status(400).json({
                message: 'Email đã được đăng ký',
                user
            })
        const {
            firstName,
            lastName,
            email,
            password,
            address,
            tel,
            role,
            date_of_birth
        } = req.body
        const _user = new Users({
            firstName,
            lastName,
            email,
            password,
            address,
            tel,
            role,
            date_of_birth
        })
        _user.save((error,data) => {
            if(error) return res.status(400).json({
                message: 'Có gì đó không đúng',
                error
            })
            if(data) return res.status(201).json({
                message: 'Đăng ký thành công',
                user: data
            })
        })
    })
}

exports.SignIn = (req,res) => {
    Users.findOne({email: req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error})
        if(user) {
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id, role: user.role},process.env.JWT_SECRET, {expiresIn: '180 days'})
                const {_id,firstName,lastName,email,role,fullName} = user;
                res.status(200).json({
                    token,
                    user: {_id,firstName,lastName,email,role,fullName}
                })
            }
            else{
                return res.status(400).json({
                    Message: 'Email hoặc mật khẩu không đúng '
                })
            }
        }else{
            return res.status(400).json({message: 'Có gì đó không đúng'})
        }
    })
}