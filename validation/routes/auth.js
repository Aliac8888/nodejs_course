const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");
const User = require("../models/user");

router.get("/login", authController.getLoginPage);

router.get("/signup", authController.getSignupPage);

router.post("/login", authController.postLogin);

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
      }).normalizeEmail(),
      body("name","name is not valid").notEmpty().trim().escape()
  ],
  authController.postSignup
);

router.post("/logout", isAuth, authController.postLogout);

module.exports = router;
