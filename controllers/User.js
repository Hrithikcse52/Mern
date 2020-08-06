const User = require("../models/user");
const Order = require("../models/order");

var getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status(400).json({
        Error: "No User Found",
      });
    req.profile = user;
    next();
  });
};

var updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile.id },
    {
      $set: req.body,
    },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(400).json({
          err: "Was Not Able to Update the user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};
var getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

var userPurchaseList = (req, res) => {
  Order.find({ user: req.profile.id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err)
        return res.status(400).json({
          error: "no Order in the account",
        });
      res.json(order);
    });
};

module.exports = {
  getUser,
  userPurchaseList,
  updateUser,
  getUserById,
};
