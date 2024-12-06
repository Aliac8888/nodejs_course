const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLoginPage = (req, res, next) => {
  res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
    isLoggedIn: req.session.loggedIn,
  });
};

exports.getSignupPage = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Signup PAGE",
    path: "/signup",
    isLoggedIn: req.session.loggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.loggedIn = true;
  res.redirect("/");
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password, confirm } = req.body;
  if (password !== confirm) {
    return res.redirect("/signup");
  }
  const hashedPass = await bcrypt.hash(password, 12);
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.redirect("/signup");
  }
  const result = await User.create({ name, email, password: hashedPass });
  return res.redirect("/login");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
