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

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5174", // admin
      "http://localhost:5173"  // frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
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