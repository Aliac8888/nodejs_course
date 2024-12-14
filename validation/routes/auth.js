const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require("../middlewares/isAuth");
const {body} = require('express-validator');

router.get("/login", authController.getLoginPage);

router.get("/signup", authController.getSignupPage);

router.post("/login", authController.postLogin);

router.post("/signup",[body("email").isEmail().custom( async (value,{req})=>{
    const userExists = await User.findOne({ email: value });
    if (userExists) {
      throw new Error("User with this email already exists!");
    }
    return true;
}),], authController.postSignup);

router.post("/logout", isAuth, authController.postLogout);

module.exports = router;
