const Users = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.SignIn = (req,res) => {
    Users.findOne({email: req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error})
        if(user) {
            if(user.authenticate(req.body.password) && user.role === 'Quản Trị'){
                const token = jwt.sign({_id: user._id,role: user.role},process.env.JWT_SECRET, {expiresIn: '180 days'})
                const {_id,firstName,lastName, email, role,fullName} = user;
                res.cookie('token',token, {expiresIn: '1h'})
                res.status(200).json({
                    token,
                    user: {_id,firstName,lastName, email, role,fullName}
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

exports.SignOut = (req,res) => {
    res.clearCookie('token')
    res.status(200).json({message: 'Sign out successful....'})
}