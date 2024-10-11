import jwt from "jsonwebtoken";
import { createError } from "../error.sj";

export const verifyToken= async (req,res,next)=>{
    try{
        if(!req.headers.authorization){
            return next(createError(401,"you are not authenticated!"));
        }
        if(!token){
            return next(createError(401,"invalid token!"));
        }

        const decode = jwt.verify(token, process.env.JWT);
        req.user=decode;
        return next();

    }catch(err){
        next(err);
    }
}