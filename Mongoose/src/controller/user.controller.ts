import { Request, Response, NextFunction} from "express"
import UserModel from "../data/user/user.data"
import { generateToken } from "../utils/jwt.utils"

export const register = (req:Request,res:Response,next:NextFunction)=>{
    try{
        UserModel.create({username:req.body.username,password:req.body.password})
            .then((result)=>{
                if(result){
                    res.sendStatus(200)
                }
            })
            .catch((exception)=>{
                console.error(exception);
                res.sendStatus(500)
            })
    }catch(error){
        console.error(error);
        res.sendStatus(500)
    }
}

export const login = (req:Request,res:Response,next:NextFunction)=>{
    UserModel.findOne({username:req.body.username,password:req.body.password,isDeleted:false})
        .then((value)=>{
            if(value){
                return generateToken({username:req.body.username,isAdmin:value.isAdmin, userID: value.id})
            }
        })
        .then((jwtToken)=>{
            res.json({token:jwtToken})
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

export const deleteUser = (req:Request,res:Response,next:NextFunction)=>{
    UserModel.updateOne({username:req.body.username},{isDeleted:true})
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.sendStatus(200)
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}



//TODO Update user - not restirected to give all attributes (Middleware)