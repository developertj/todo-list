const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

//Register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered!" });
});

//Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("Generated Token:", token);
    console.log("Login Successful - Sending User:", { id: user._id, username: user.username }); // ✅ Debugging
    res.json({ token, user: { id: user._id, username: user.username } });
});

module.exports = router;