const Products = require("../models/product");
const formdible = require("formidable");
const _ = require("lodash");
const fs = require("fs");

var getProductById = (req, res, next, id) => {
  Products.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err)
        return res.status(400).json({
          Err: "product not Found",
        });
      // console.log(product ? "1" : "2");

      req.product = product;
      next();
    });
};

var createProduct = (req, res) => {
  let form = formdible.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, field, file) => {
    if (err)
      return res.status(400).json({
        err: "Problem With Response",
      });

    let product = Products(field);

    if (file.photo) {
      if (file.photo > 3000000) {
        return res.status(400).json({
          err: "Photo Size is Large",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.contentType;
    }

    product.save((err, product) => {
      if (err)
        res.status(400).json({
          err: err.message,
        });
      res.json(product);
    });
  });
};

var getAllProduct = (req, res) => {
  Products.find().exec((err, product) => {
    if (err)
      return res.status(400).json({
        err,
      });

    res.json(product);
  });
};

var getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json({
    product: req.product,
  });
};

var photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    res.send(req.product.photo.data);
  }
  next();
};

var removeProduct = (req, res) => {
  const product = req.product;
  product.remove((err, product) => {
    if (err)
      return res.status(400).json({
        err,
      });
    res.json({
      message: `${product.name} is Deleted`,
    });
  });
};

var updateProduct = (req, res) => {
  let product = req.product;
};
module.exports = {
  getProductById,
  createProduct,
  getProduct,
  photo,
  getAllProduct,
  removeProduct,
};
