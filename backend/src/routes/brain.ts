import {Router} from "express";
import auth from "../middlewares/auth";
import express from "express";
const router  =  express.Router();
import {Share, Content, User} from "../db"


router.post('/share', auth, async(req, res)=>{
    const {share} = req.body; // share : boolean
    // @ts-ignore
    const userId = req.id;
    const randomLink = Math.floor(Math.random()*1000000000000).toPrecision();

    
    try {
        if(share){
            const existingLink = await Share.findOne({
                userId
            });
            if(existingLink){
                return res.json({
                    "Share your secondBrain to your friends": existingLink.hash
                })
            }
           
            await Share.create({
                hash: randomLink,
                userId
            })
            return res.json({
                "Share your secondBrain to your friends": randomLink
            })
        }
        else{
            await Share.deleteOne({
                userId
            })
            return res.json({
                message: "Disabled the link"
            })
        }

        
    } catch (error) {
        return res.json({Err:" err found in sharing  the link"})
    }
    
})

router.get('/share/:shareLink', async(req, res)=>{
    const {shareLink} = req.params;
    console.log("from /brain/sharLink")

    try {
        const validLink = await Share.findOne({
            hash : shareLink,
        })

        if(!validLink) return res.status(404).json({msg:"Second Brain Not Found"})  
        
        const userId = validLink.userId;
        
        const user: any = await User.findById(userId);
        const userSecondBrain = await Content.find({userId});

        return res.json({
            "Owner of the secondBrain": user.username ,
            "Second Brain Contents" : userSecondBrain,
        })
    } catch (error) {
        return res.json({Err:" err found in sharing  the link"})
    }
    
})

export default router;