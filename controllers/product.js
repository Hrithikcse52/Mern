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

      req.product = product;
    });

  next();
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

module.exports = {
  getProductById,
  createProduct,
};
