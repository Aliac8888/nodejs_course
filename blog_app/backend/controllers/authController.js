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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, userId: id });
  } catch (error) {
    res.status(500).json({ error: "login failed" });
  }
};
