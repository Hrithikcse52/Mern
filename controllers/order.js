const { Order, ProductCart } = require("../models/order");
const order = require("../models/order");

const getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err)
        return res.status(400).json({ err, message: "No Order Found n DB" });
      req.order = order;
      next();
    });
};

const createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = Order(req.body.order);
  order.save((err, order) => {
    if (err)
      return res.status(400).json({
        err,
        message: "No Able to create order",
      });

    res.json(order);
  });
};

const getAllOrder = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err)
        return res.status(400).json({
          err,
          message: "No Orders",
        });
      res.json(order);
    });
};

const getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

const updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    {
      $set: { status: req.body.status },
    },
    (err, orderStatus) => {
      if (err)
        return res.status(400).json({
          err,
          message: "Couldn't Update Order Status",
        });
      res.json(orderStatus);
    }
  );
};

module.exports = {
  getOrderById,
  createOrder,
  getAllOrder,
  getOrderStatus,
  updateOrderStatus,
};
