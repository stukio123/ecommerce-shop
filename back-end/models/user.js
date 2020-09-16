const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 32
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 32
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashPassWord:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Custommer','Admin','Staff'],
        default: 'Custommer'
    },
    Address: { type: String},
    Tel: { type: String},
    profilePicture: {type: String}
},{timestamps: true})

usersSchema.virtual('password').set(function(password){
    this.hashPassWord = bcrypt.hashSync(password,10)
    console.log(`${this.hashPassWord} và ${password}`)
})

usersSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

usersSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hashPassWord)
    }
}

module.exports = mongoose.model('Users',usersSchema)