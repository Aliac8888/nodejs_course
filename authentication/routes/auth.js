const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.getLoginPage);

router.get("/signup", authController.getSignupPage);

router.post("/login", authController.postLogin);

router.post("/signup", authController.postSignup);

router.post("/logout", authController.postLogout);

module.exports = router;
