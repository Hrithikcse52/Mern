const express = require("express");
const router = express.Router();

const { isSignedIn, isAdmin, isAuth } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/User");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuth, getUser);
router.get("/user/orders/:userId", isSignedIn, isAuth, userPurchaseList);

router.put("/user/:userId", updateUser);
// Get All User Route
// router.get("/users", getAllUser);

module.exports = router;
