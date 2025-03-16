import { User } from "../db";
import { secret } from "../config";
import express from "express";

const router = express.Router();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

router.post("/up", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 7);
    await User.create({
      username,
      password: hash,
    });
    return res.json({ msg: "User created successfully..." });
  } catch (e) {
    return res.status(411).json({ Error: `User already exists ` });
  }
});

router.post("/in", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
    });
    if (!user) return res.status(413).json({ Error: "Invalid Credentials" });
    const isPassword = await bcrypt.compare(password, user.password); // returns trur or false

    if (isPassword) {
      if(secret === undefined) return;
      const token = jwt.sign({ id: user._id }, secret);
      return res.json({ TokenGenerated: token });
    }
    return res.status(413).json({ Error: "Invalid Credentials" });
  } catch (e) {
    return res.status(413).json({ Error: `Error signing in ${e}` });
  }
});

export default router;
