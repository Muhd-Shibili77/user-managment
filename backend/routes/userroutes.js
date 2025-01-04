const express = require('express');

const jwt = require('jsonwebtoken')
const upload = require('../config/Multer.js')
const User = require('../models/userModel.js')
const usercontroller = require('../controllers/usercontroller.js')
const authMiddleware = require('../middlewares/authmiddlewares.js')
const userrouter = express.Router()

userrouter.post('/register',usercontroller.register)
userrouter.post('/login',usercontroller.login)
userrouter.post('/upload', authMiddleware, upload.single('profileImage'),usercontroller.uploadProfileImage);
userrouter.post('/update',authMiddleware,usercontroller.updateName)



module.exports = userrouter;