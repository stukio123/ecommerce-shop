const Users = require('../../models/user')
const jwt = require('jsonwebtoken')

// exports.SignUp = (req,res,next) => {
//     Users.findOne({email: req.body.email})
//     .exec((error,user) => {
//         if(user)
//             return res.status(400).json({
//                 message: 'Email đã được đăng ký'
//             })
//         const {
//             firstName,
//             lastName,
//             email,
//             password
//         } = req.body
//         console.log(req.body)
//         const _user = new Users({
//             firstName,
//             lastName,
//             email,
//             password,
//             userName: Math.random().toString(),
//             role: 'Admin'
//         })
//         _user.save((error,data) => {
//             if(error) return res.status(400).json({
//                 message: 'Có gì đó không đúng',
//                 error
//             })
//             if(data) return res.status(201).json({
//                 message: 'Đăng ký thành công',
//                 //user: data
//             })
//         })
//     })
// }

exports.SignIn = (req,res) => {
    Users.findOne({email: req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error})
        if(user) {
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id},process.env.JWT_SECRET, {expiresIn: '3M'})
                const {_id,firstName,lastName, email, role,fullName} = user;
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

exports.requireSignIn = (req,res,next) =>{
    const token =req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token,process.env.JWT_SECRET)
    req.user = user
    next()
}