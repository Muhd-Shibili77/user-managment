const User = require('../models/userModel.js');
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const query = req.query.name || '';
    const users = await User.find({
      name: { $regex: query, $options: 'i' }, // Case-insensitive search for name
      role: 'user' // Fetch only users with the role 'user'
    });
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addUser = async (req,res)=>{
    
    const { name, email, password } = req.body;
    
    if (!name || name.trim().length < 2) {
        return res
          
          .json({
            success: false,
            message: "Name must be at least 2 characters long.",
          });
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        return res
          
          .json({
            success: false,
            message: "Name must contain only alphabets and spaces.",
          });
      }
    
      if (!email || email.trim() === "") {
        return res
          
          .json({ success: false, message: "Email is required." });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res
          
          .json({ success: false, message: "Invalid email format." });
      }
      const emailExist = await User.findOne({ email: email });
      if (emailExist) {
        return res
          
          .json({ success: false, message: "email already used" });
      }
    
      if (!password || password.trim().length < 8) {
        return res
          
          .json({
            success: false,
            message: "Password must be at least 8 characters long.",
          });
      } else if (!/(?=.*[A-Z])/.test(password)) {
        return res
          
          .json({
            success: false,
            message: "Password must include at least one uppercase letter.",
          });
      } else if (!/(?=.*[0-9])/.test(password)) {
        return res
          
          .json({
            success: false,
            message: "Password must include at least one number.",
          });
      } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
        return res
          
          .json({
            success: false,
            message: "Password must include at least one special character.",
          });
      }




    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.json({ success:false,message: 'User already exists' });
      }
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ name, email, password:hashedPassword });
      await user.save();
      res.json({ success:true,message: 'User added successfully', user });
  
  }catch(error){
    console.error(error)
    res.json({ message: 'Server error' });
  }

}

module.exports = { getUsers, updateUser, deleteUser,addUser };
