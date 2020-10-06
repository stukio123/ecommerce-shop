const Categories = require("../models/categories");
const slugify = require("slugify");

exports.addCategory = (req, res) => {
  console.log(req.body);
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name, {
      remove: /[*+~.()'"!:@]\s/g,
      replacement: "-",
      locale: "vi",
    }),
  };
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Categories(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ message: "Thêm thành công", category });
    }
  });
};

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.getCategory = (req, res) => {
  Categories.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      return res.status(200).json({ categoryList });
    }
  });
};

exports.delCategory = async (req, res) => {
  const {id} = req.params
  console.log(id)
  //Tìm những category là con của category muốn xóa
  //Xóa category đó đi và xóa luôn category là con của category cần xóa
  let delArray = await Categories.find({ parentId: id }).exec();
  console.log(delArray)
  //delArray.forEach(cat => console.log(cat._id))
  await Categories.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (delArray.length > 0) {
      delArray.forEach(async (cat) =>
        await Categories.findOneAndDelete({ _id: cat._id }, (error) => {
          if (error) {
            return res.status(400).json({ error });
          }
        })
      );
    }
    return res.status(201).json({ mess: "Delete success" });
  });
};

exports.editCategory = async (req, res) => {
  const {_id, name, parentId } = req.body;
  const category = {
    name: name,
    slug: slugify(name, {
      remove: /[*+~.()'"!:@]\s/g,
      replacement: "-",
      locale: "vi",
    }),
    parentId: parentId
  }
  console.log(category)
  await Categories.findOneAndUpdate({_id},category,{new: true},(error) => {
    if(error) return res.status(400).json({error})
    return res.status(201).json({message: "Cập nhật thành công"})
  });
};
