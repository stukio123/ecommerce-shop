const Categories = require('../models/categories')
const slugify = require('slugify')

exports.addCategory = (req,res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name,{
            remove: /[*+~.()'"!:@]\s/g,
            replacement: '-',
            locale: 'vi'
        })
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }

    const cat = new Categories(categoryObj)
    cat.save((error, category) => {
        if(error) return res.status(400).json({ error})
        if(category){
            return res.status(201).json({message: 'Thêm thành công',category})
        }
    })
}

function createCategories(categories, parentId = null){
    const categoryList = []
    let category
    if(parentId == null)
    {
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let cate of category){
        categoryList.push({
            _id: cate.parentId,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories , cate._id)
        })
    }
    return categoryList
}

exports.getCategory = (req,res) => {
    Categories.find({})
    .exec((error,categories) => {
        if(error) return res.status(400).json({ error})
        if(categories){
            const categoryLish = createCategories(categories)
            return res.status(200).json({categoryLish})
        }
    })
}