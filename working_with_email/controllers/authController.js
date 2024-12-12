const User = require("../models/user");
const bcrypt = require("bcryptjs");
const mailClient = require('../helpers/mailClient');

exports.getLoginPage = (req, res, next) => {
  res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
    errorMessage: req.flash("error"),
  });
};

exports.getSignupPage = (req, res, next) => {
  res.render("pages/auth/signup", {
    title: "Signup PAGE",
    path: "/signup",
    errorMessage: req.flash("error"),
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "User with this email not found!");
      return res.redirect("/login");
    }
    const userMatched = await bcrypt.compare(password, user.password);
    if (userMatched) {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
    req.flash("error", "Unknown error!");
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during login:", err);
    req.flash("error", "Unknown error!");
    return res.redirect("/login");
  }
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    req.flash("error", "All fields are required!");
    return res.redirect("/signup");
  }

  if (password !== confirm) {
    req.flash("error", "Password and Confirm Password do not match!");
    return res.redirect("/signup");
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      req.flash("error", "User with this email already exists!");
      return res.redirect("/signup");
    }

    const hashedPass = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPass });

    req.flash("success", "Account created successfully!");
    mailClient.sendWelcome(email,"welcome to my website","textxtxtxtxetsetsdewrwer");
    return res.redirect("/login");
  } catch (err) {
    console.error("Error during signup:", err);
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/signup");
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
