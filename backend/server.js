import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRouter.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


//app config
const app=express();
const port=process.env.PORT || 4000;
connectDB()
connectCloudinary()

//MIDDLEWARES

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173", // frontend local
  "http://localhost:5174", // admin local
  "https://prescripto-frontend-rouge.vercel.app",
  "https://prescripto-ebon-three.vercel.app" // admin vercel
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//API End Points

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

//localhost:4000/api/admin/add-doctor


app.get('/',(req,res)=>{
res.send('API working')
})

app.listen(port,()=>console.log("serever started",port))