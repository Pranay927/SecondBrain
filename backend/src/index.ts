import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from "cors";
require("dotenv").config();

const PORT = process.env.PORT || 2000; // Use Vercel's assigned port

import user from "./routes/user";
import content from "./routes/content";
import brain from "./routes/brain";

import logger from "./middlewares/logger";

import dotenv from "dotenv";
dotenv.config();

// 🔥 Allow CORS for specific frontend origins
const allowedOrigins = [
  "https://secondbrain-frontend-pst783q3r-pranays-projects-11125deb.vercel.app",
  "http://localhost:5173", // Local testing
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/auth headers
  })
);

// 🔥 Middleware to manually set CORS headers for Vercel API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Change '*' to your frontend URL in production
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No content for preflight
  }
  next();
});

app.use(express.json());
app.use(logger);

app.use("/secondBrain/user", user);
app.use("/secondBrain/content", content);
app.use("/secondBrain/brain", brain);

const dbUrl = process.env.DB_URL;
const main = async () => {
  try {
    if (!dbUrl) {
      throw new Error("Please provide your MongoDB connection string in the .env file!");
    }
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();
