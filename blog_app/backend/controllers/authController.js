const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPass,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    res.status(500).json({ error: "registration failed" });
  }
};
