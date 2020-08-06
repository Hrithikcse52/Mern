const User = require("../models/user");
var { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
const { models } = require("mongoose");

//signup controller

var signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      onParam: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: "Something Went Worng" });
    }
    res.json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    });
  });
};

//signout controller

var signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Succesfully Logout",
  });
};

//signin controller

var signin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Eamil Does't Exists",
      });
    }

    // if (!user) {
    //   return res.status(400).json({
    //     error: "User Email doesn't exists",
    //   });
    // }

    //authenticati88888ng the password

    if (!user.auth(password)) {
      return res.status(401).json({
        error: "Email and Password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // put token into  cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

var isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

var isAuth = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

var isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Not Admin",
    });
  }
  next();
};
module.exports = {
  signin,
  signup,
  signout,
  isSignedIn,
  isAuth,
  isAdmin,
};
