const Category = require("../models/category");

var getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Category Not Found",
      });
    }
    req.category = category;
    next();
  });
};

var createCategroy = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Could Not Save Category",
      });
    }
    res.json({ category });
  });
};

var getCategory = (req, res) => {
  return res.json(req.category);
};

var getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err)
      return res.status(404).json({
        err: "No Category Found",
      });

    res.json(categories);
  });
};

var updateCatgory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ err });
    }

    res.json(updatedCategory);
  });
  //   Category.findByIdAndUpdate(
  //     { _id: req.category.id },
  //     {
  //       $set: req.body,
  //     },
  //     { new: true, useFindAndModify: false },
  //     (err, category) => {
  //       if (err) res.status(400).json({ err });
  //       res.json({ category });
  //     }
  //   );
};

var removeCategory = (req, res) => {
  const category = req.category;
  category.delete((err, category) => {
    if (err)
      return res.status(400).json({
        err,
      });
    res.json({
      message: `$category is Deleted`,
    });
  });
};

module.exports = {
  createCategroy,
  getCategoryById,
  getCategory,
  getAllCategory,
  updateCatgory,
  removeCategory,
};
