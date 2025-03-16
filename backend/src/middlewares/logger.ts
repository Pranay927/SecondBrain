
import { NextFunction, Request, Response } from "express";

let x: number  = 0;
const logger = (req:Request, res:Response, next:NextFunction)=>{
    try {
        x+=1;
        console.log(`________________________________`)
        console.log(`Req number ${x}...`)
        console.log(`URL: ${req.url}`)
        console.log(`Method: ${req.method}`)
        console.log(`Body: ${req.body}`)
        console.log(`________________________________`)
        next();

    } catch (error) {
        return res.status(400).json({Error:error})
    }
}

export default logger;