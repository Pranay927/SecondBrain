import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors"

import user from './routes/user'
import content from './routes/content'
import brain from './routes/brain';

import logger from "./middlewares/logger";


app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/secondBrain/user", user);
app.use("/secondBrain/content", content )
app.use("/secondBrain/brain", brain )


const main = async () => {
    try {
        await mongoose.connect("mongodb+srv://Limitless:123123123@appledb.yhy8h.mongodb.net/SecondBrain?retryWrites=true&w=majority");
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


