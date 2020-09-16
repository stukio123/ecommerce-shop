const mongooes = require('mongoose')
const productsSchema = mongooes.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    discountPrice:{
        type: Number
    },
    productImages: [{
        imgs: {type: String}
    }],
    mainImage: {
        type: String
    },
    reviews: [{
        userId: {type: mongooes.Schema.Types.ObjectId, ref: 'Users'},
        review: String,
        rating: Number
    }],
    category: {type: mongooes.Schema.Types.ObjectId, ref:'Categories'},
    createdBy: {type: mongooes.Schema.Types.ObjectId, ref: 'Users'},
    createdDate: Date,
    uodateBy: {type: mongooes.Schema.Types.ObjectId, ref: 'Users'},
    updateAt: Date
},{timestamps: true})

module.exports = mongooes.model('Products',productsSchema)