const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getLoginPage = (req, res, next) => {
  return res.render("pages/auth/login", {
    title: "LOGIN PAGE",
    path: "/login",
    errorMessage: req.flash("error"),
    oldInput: { email: "", password: "" },
  });
};

exports.getSignupPage = (req, res, next) => {
  return res.render("pages/auth/signup", {
    title: "Signup PAGE",
    path: "/signup",
    errorMessage: req.flash("error"),
    oldInput: { email: "", password: "", name: "", confirm: "" },
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.render("pages/auth/login", {
      title: "LOGIN PAGE",
      path: "/login",
      errorMessage: req.flash("error"),
      oldInput: { email, password },
    });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "User with this email not found!");
      return res.render("pages/auth/login", {
        title: "LOGIN PAGE",
        path: "/login",
        errorMessage: req.flash("error"),
        oldInput: { email, password },
      });
    }
    const userMatched = await bcrypt.compare(password, user.password);
    if (userMatched) {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
    req.flash("error", "error occurred: user not matched");
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during login:", error);
    error.status = 500;
    return next(error);
  }
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password, confirm } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("error", errors.array()[0].msg);
    return res.render("pages/auth/signup", {
      title: "Signup PAGE",
      path: "/signup",
      errorMessage: req.flash("error"),
      oldInput: { name, email, password, confirm },
    });
  }

  try {
    const hashedPass = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPass });

    req.flash("success", "Account created successfully!");
    return res.redirect("/login");
  } catch (error) {
    console.error("Error during login:", error);
    error.status = 500;
    return next(error);
  }
};

exports.postLogout = (req, res, next) => {
  try {
    return req.session.destroy(() => {
      return res.redirect("/");
    });
  } catch (error) {
    console.error("Error during login:", error);
    error.status = 500;
    return next(error);
  }
};
