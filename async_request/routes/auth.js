const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");
const User = require("../models/user");

router.get("/login", authController.getLoginPage);

router.get("/signup", authController.getSignupPage);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 4 })],
  authController.postLogin
);

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom(async (value, { req }) => {
        const userExists = await User.findOne({ email: value });
        if (userExists) {
          throw new Error("User with this email already exists!");
        }
        return true;
      })
      .normalizeEmail(),
    body("name", "name is not valid").notEmpty().trim().escape(),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("password must be at least 4 characters"),
    body("confirm").custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Password and Confirm Password do not match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", isAuth, authController.postLogout);

module.exports = router;
