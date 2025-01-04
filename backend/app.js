const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const userroutes = require('./routes/userroutes')
const adminroutes = require('./routes/adminroutes')
const connectDB = require('./config/DB.js')

app.use(cors());
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use('/user',userroutes)
app.use('/admin',adminroutes)
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is started at http://localhost:${PORT}`)
})


