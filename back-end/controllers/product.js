const Products = require('../models/products')
const shortid = require('shortid')
const slugify = require('slugify')

exports.createProduct = (req,res) => {
    //res.status(200).json({file: req.files, body: req.body})
    const {name, description, category, price,attrs,brand} = req.body

    let productImages = []

    for(let attr in attrs){
        console.log(attr)
    }

    //xử lý upload firebase tại đây
    if(req.files.length > 0 ){
        productImages = req.files.map(file => {
            return {img : file.filename}
        })
    }

    let mainImage = []
    mainImage = productImages[0].img

    const product = new Products({
        name: name,
        slug: slugify(name,{
            remove: /[*+~.()"!:@]\'\&\s/gm,
            lower: true,
            strict: true,
            replacement: '-',
            locale: 'vi'
        }),
        brand,
        price,
        description,
        productImages,
        mainImage,
        attrs,
        category,
        createdBy: req.user._id
    })

    product.save((error, product) => {
        if(error) return res.status(400).json({error})
        if(product) return res.status(200).json({message: 'Thêm thành công sản phẩm', product})
    })
}