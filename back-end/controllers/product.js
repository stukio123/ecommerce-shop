const Products = require("../models/products");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const {
    name,
    description,
    category,
    price,
    attrs,
    brand,
    productImages,
  } = req.body;

  console.log(req.body);

  for (let attr in attrs) {
    console.log(attr);
  }

  let mainImage = [];
  for (let img of productImages) {
    mainImage = img.img;
    break;
  }

  const product = new Products({
    name: name,
    slug: slugify(name, {
      remove: /[*+~.()"!:@]\'\&\s/gm,
      lower: true,
      strict: true,
      replacement: "-",
      locale: "vi",
    }),
    brand,
    price,
    description,
    productImages,
    mainImage,
    attrs,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product)
      return res
        .status(200)
        .json({ message: "Thêm thành công sản phẩm", product });
  });
};

exports.delProduct = (req, res) => {
  const { id } = req.body;
  Products.findOneAndDelete({ _id: id }, (error) => {
    if (error) return res.status(401).json({ error });
    return res.status(201).json({ message: "Xóa thành công" });
  });
};

exports.editProduct = (req, res) => {};
