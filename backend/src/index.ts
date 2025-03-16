import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors"
require('dotenv').config();
const PORT = process.env.PORT || 2000; // Use Vercel's assigned port

import user from './routes/user'
import content from './routes/content'
import brain from './routes/brain';

import logger from "./middlewares/logger";

import dotenv from "dotenv"
dotenv.config();
const allowedOrigins = [
    "https://secondbrain-frontend-pst783q3r-pranays-projects-11125deb.vercel.app",
    "http://localhost:5173", // Add this if testing locally
  ];
  
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allow cookies/auth headers
    })
  );


app.use(express.json());
app.use(logger);

app.use("/secondBrain/user", user);
app.use("/secondBrain/content", content )
app.use("/secondBrain/brain", brain )


const dbUrl = process.env.DB_URL;
const main = async () => {
    try {
        if (!dbUrl) {
            console.log()
            throw new Error("Please provide your MongoDB connection string in the .env file!");
        }
        await mongoose.connect(dbUrl);
        app.listen(PORT, ()=>{
            console.log("Sever running on http://localhost:2000")
        })

    } catch (error) {
        console.log(error);
    }
}
main();



// app.use("/content", content);
// app.use("/brain", brain)


