const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    }
})

module.exports = mongoose.model('User',UserSchema)