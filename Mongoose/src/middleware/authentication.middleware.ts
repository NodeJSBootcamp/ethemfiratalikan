import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt.utils"


export const authtenticateForAdmin = (req:Request, res:Response, next:NextFunction) =>{
    const jwtToken = req.headers["authorization"] as string
    const verifyTokenResult = verifyToken(jwtToken)
    if(verifyTokenResult.isAdmin){
        next()
    }else{
        res.sendStatus(500)
    }
}

export const authtenticateUser = (req:Request, res:Response, next:NextFunction) =>{
    const jwtToken = req.headers["authorization"] as string
    try{
        const verifyTokenResult = verifyToken(jwtToken)
        //@ts-ignore
        req.userID = verifyTokenResult.userID;
         //@ts-ignore
        req.username = verifyTokenResult.username;
        next(); 
    }catch(error){
        return res.status(403).json({ message: 'Not valid token.' });
    }
    
}