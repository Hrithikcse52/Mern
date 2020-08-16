const express = require("express");
const router = express.Router();
var { check, body } = require("express-validator");

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  getAllProduct,
} = require("../controllers/product");
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

router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", photo);

//Get all Products
router.get("/products", getAllProduct);

//Delete Product
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  removeProduct
);

//Update Product
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  removeProduct
);

module.exports = router;
