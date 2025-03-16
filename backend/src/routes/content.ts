import mongoose from "mongoose";
import express from "express";
import {Router} from "express"; 
const router = express.Router();
import auth from "../middlewares/auth";
import {Content} from "../db"

router.post('/', auth,  async(req, res)=>{
    try {
        const{link, title, type, tags} = req.body;
        // @ts-ignore
        const userId  = req.id;

        const newContent = await Content.create({
            link,
            title,
            type,
            tags: tags||[],
            userId,
        })

        return res.json({"New Brain Added": newContent})
        
    } catch (e) {
        return res.status(413).json({ "Error": `Error adding content ${e}` })
    }
})

router.get('/', auth,  async(req, res)=>{
    try {
        // @ts-ignore
        const userId  = req.id ;
        
        const content = await Content.find({
            userId,
        })

        return res.json({"Your Brains": content})
        
    } catch (e) {
        return res.status(413).json({ "Error": `Error fetching content ${e}` })
    }
})

router.delete('/', auth,  async(req, res)=>{
    try {
        // @ts-ignore
        const {contentId} = req.body;
        
        const content = await Content.findByIdAndDelete(contentId);

        return res.json({"Deleted the Brain ": content})
        
    } catch (e) {
        return res.status(413).json({ "Error": `Error while deleting ${e}` })
    }
})

export default router;