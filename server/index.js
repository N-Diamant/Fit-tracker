import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js"

 dotenv.config(); // for loading stuf in .env

 const app = express();
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 //error handler


 app.get("/", async (req,res)=>{
    res.status(200).json({
        message:"hello developers!"
    })
 });

 app.use("/api/user",UserRoutes);
 app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message,
    });
 });


 const connectDB = () =>{
    mongoose.set("strictQuery", true);
    mongoose
    .connect(process.env.MONGODB_URL)
    .then((res)=> console.log("Connected to mongodb"))
    .catch((err)=>{
        console.log(err);
    })
 }

 const startServer =  async () =>{
    try{
        connectDB();
        app.listen(8080, ()=> console.log("server running at port 8080"))
    }catch(err){
        console.log(err);
    }
 }

 startServer();