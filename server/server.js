
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import cors from 'cors';


connectDB();

dotenv.config();
// Use the CORS middleware
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/auth',authRoutes)


const PORT = process.env.PORT;

app.listen(PORT , ()=>{
    console.log('Server running on port :', PORT)
})