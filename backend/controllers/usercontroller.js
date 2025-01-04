const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name must be at least 2 characters long.",
      });
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name must contain only alphabets and spaces.",
      });
  }

  if (!email || email.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format." });
  }
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res
      .status(400)
      .json({ success: false, message: "email already used" });
  }

  if (!password || password.trim().length < 8) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
  } else if (!/(?=.*[A-Z])/.test(password)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must include at least one uppercase letter.",
      });
  } else if (!/(?=.*[0-9])/.test(password)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must include at least one number.",
      });
  } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must include at least one special character.",
      });
  }

  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true, message: "User registered" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "password is empty" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ success: true, message: "login successfull", token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const user = req.user;
    user.profileImage = req.file.filename;
    await user.save();
    res.json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateName = async (req, res) => {
  try {
    console.log(req.body)
    const user = req.user;
    const newName = req.body.name;
    console.log(newName)
    if (!newName || newName.trim().length < 2) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name must be at least 2 characters long.",
        });
    } else if (!/^[A-Za-z\s]+$/.test(newName)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name must contain only alphabets and spaces.",
        });
    }

    user.name = newName;
    await user.save();
    res.json({ success: true, message: "user name is updated",updatedUser:user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  uploadProfileImage,
  updateName,
};
