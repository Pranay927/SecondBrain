import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors"
require('dotenv').config();

import user from './routes/user'
import content from './routes/content'
import brain from './routes/brain';

import logger from "./middlewares/logger";

import dotenv from "dotenv"
dotenv.config();

app.use(cors());
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
        app.listen(2000, ()=>{
            console.log("Sever running on http://localhost:2000")
        })

    } catch (error) {
        console.log(error);
    }
}
main();



// app.use("/content", content);
// app.use("/brain", brain)


