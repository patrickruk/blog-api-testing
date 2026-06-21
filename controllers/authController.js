const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hash,
      role: req.body.role || "user"
    });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Authentication failed" });

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
