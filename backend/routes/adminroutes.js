const express = require('express');
const admincontroller = require('../controllers/admincontroller')
const authMiddleware = require('../middlewares/authmiddlewares');

const adminrouter = express.Router();

adminrouter.get('/users', authMiddleware, admincontroller.getUsers);
adminrouter.put('/users/:id', authMiddleware, admincontroller.updateUser);
adminrouter.delete('/users/:id', authMiddleware, admincontroller.deleteUser);
adminrouter.post('/addUser',authMiddleware,admincontroller.addUser)

module.exports = adminrouter;
