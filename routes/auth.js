var express = require("express");
var { check } = require("express-validator");
var router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//router for signup

router.post(
  "/signup",
  [
    check("name", "Name Should have more than 3 character").isLength({
      min: 3,
    }),
    check("email", "Email Is Required").isEmail(),
    check("password", "Password Must Contain 6 Characters").isLength({
      min: 6,
    }),
  ],
  signup
);

//router for singin

router.post(
  "/signin",
  [
    check("email", "Email Is Required").isEmail(),
    check("password", "Password Field is requires").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/", isSignedIn, (req, res) => {
  res.json({
    test: req.auth,
    profile: req.profile,
  });
});

module.exports = router;
