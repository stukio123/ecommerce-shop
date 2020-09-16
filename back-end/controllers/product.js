const Products = require('../models/products')
const shortid = require('shortid')

exports.createProduct = (req,res) => {
    res.status(200).json({file: req.file, body: req.body})
}