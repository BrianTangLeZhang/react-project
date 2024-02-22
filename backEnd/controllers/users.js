const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { rmSync } = require("fs");
const { SECRET_KEY } = process.env;

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json(user);
  } catch (e) {
    return res.json({ error: e.message, stats: 400 });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { fullname, username, password, email } = req.body;
    const userFound = await User.findOne({ username });
    const emailFound = await User.findOne({ email });
    if (userFound) {
      return res.json({ msg: "User already exists", status: 400 });
    }
    if (emailFound) {
      return res.json({ msg: "Email already exists", status: 400 });
    }
    if (fullname.length < 3) {
      return res.json({
        msg: "Fullname should be atleast 3 characters",
        status: 400,
      });
    }
    if (username.length < 6) {
      return res.json({
        msg: "Username should be atleast 6 characters",
        status: 400,
      });
    }
    if (password.length < 8) {
      return res.json({
        msg: "Password should be atleast 8 characters",
        status: 400,
      });
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let user = new User(req.body);
    user.password = hash;
    user.save();
    return res.json({
      user,
      msg: "Registered Successfully",
    });
  } catch (e) {
    return res.json({ error: e.message, status: 400 });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let userFound = await User.findOne({ username });

    if (!userFound) {
      return res.json({
        msg: "Invalid Credentials",
        status: 400,
      });
    }
    let isMatch = bcrypt.compareSync(password, userFound.password);
    if (!isMatch) {
      return res.json({
        msg: "Invalid Credentials",
        status: 400,
      });
    }

    userFound = userFound.toObject();
    delete userFound.password;

    let token = jwt.sign({ data: userFound }, SECRET_KEY, { expiresIn: "16h" });
    return res.json({
      token,
      user: userFound,
      msg: "Logged in Successfully",
    });
  } catch (e) {
    return res.json({ error: e.message, status: 400 });
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        isVIP: true,
      },
      { new: true }
    );
    return res.json({ msg: "You are VIP now", user });
  } catch (e) {
    return res.json({ error: e.message, status: 400 });
  }
});

module.exports = router;
