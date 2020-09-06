const express = require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require("../controllers/User");
const { isSignedIn, isAdmin, isAuth } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  createOrder,
  getAllOrder,
  getOrderStatus,
  updateOrderStatus,
} = require("../controllers/order");

// Param Middle Ware
router.param("userId", getUserById);
router.param("orderId", getOrderById);
//Create Route

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuth,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//Get All Orders

router.get("/order/all/:userId", isSignedIn, isAuth, isAdmin, getAllOrder);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  getOrderStatus
);

router.post(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
