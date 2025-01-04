const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/user-managment')
        console.log('connected to mongodb')
    }catch(error){
        console.error('mongodb connection error',error)
    }
}

module.exports = connectDB