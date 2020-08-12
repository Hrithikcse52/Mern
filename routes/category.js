const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/User");
const { isSignedIn, isAuth, isAdmin } = require("../controllers/auth");
const {
  getCategoryById,
  createCategroy,
  getCategory,
  getAllCategory,
  updateCatgory,
  removeCategory,
} = require("../controllers/category");

router.param("userId", getUserById);

router.param("categoryId", getCategoryById);

//Actual Routes

//Create
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  createCategroy
);

//Read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update
router.put(
  "/category/:categoryId/:userId",

  isSignedIn,
  isAuth,
  isAdmin,
  updateCatgory
);

//Delete

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuth,
  isAdmin,
  removeCategory
);

module.exports = router;
