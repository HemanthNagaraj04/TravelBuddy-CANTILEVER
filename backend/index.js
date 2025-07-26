const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();
const authRoutes=require('./routes/authroutes');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to mongoDB");
    app.listen(5000,console.log("running on port 5000"));
})
.catch(error=>console.log(error));
