import {Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { secret } from "../config";


/* to access authenticated endpoints  */
const auth = (req: Request, res: Response, next: NextFunction) =>{
    try {
            let {authorization}  = req.headers;
            console.log(authorization)
            authorization = authorization?.split(' ')[1];
            if(!authorization) return res.status(403).json({error: "Unauthorized"})
            const decode = jwt.verify(authorization , secret);
            // use  authorization as string if not undefined
            
            // @ts-ignore -------fix this -----
            req.id = (decode as JwtPayload).id;
            next();

    } catch (error) {
        return res.status(403).json({Error: "Unauthorized"})
    }
}

export default auth;