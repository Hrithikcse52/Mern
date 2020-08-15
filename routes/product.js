const express = require("express");
const router = express.Router();
var { check, body } = require("express-validator");

const { getProductById, createProduct } = require("../controllers/product");
const { isSignedIn, isAuth, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/User");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  createProduct
);

module.exports = router;
