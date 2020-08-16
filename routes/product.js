const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  getAllProduct,
  updateProduct,
  getAllDistinctCategory,
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

//Get all Distinct Category
router.get("/products/categories", getAllDistinctCategory);

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
  updateProduct
);

module.exports = router;
