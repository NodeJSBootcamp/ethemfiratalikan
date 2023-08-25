//@ts-nocheck

import { Request, Response, NextFunction} from "express"
import TweetModel from "../data/tweet/tweet.data"
import { generateToken } from "../utils/jwt.utils"

export const saveTweet = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.create({
        //@ts-ignore
        userID:req.userID, 
        tweet:req.body.tweet
    })
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

export const updateTweet = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.findOneAndUpdate({id: req.params.id, isDeleted: false},{
        //@ts-ignore
        tweet:req.body.tweet
    })
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

export const deleteTweet = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.findOneAndUpdate({id: req.params.id},{
        //@ts-ignore
        isDeleted:true,
    })
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


export const getAllTweets = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.find({})
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.status(200).json(result.map(data => {
                    return {
                        tweet: data.tweet,
                        id: data.id.toString("hex"),
                        likes: data.likes.map(r => {
                            return {
                                userID: r.user?.ID.toString("hex"),
                                username: r.user?.name,
                            }
                        }),
                        likeCount: data.likes.length,
                        comments:  data.comments.map(r => {
                            return {
                                userID: r.user?.ID.toString("hex"),
                                username: r.user?.name,
                                comment: r.comment,
                            }
                        }),
                    }
                    
                }));
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

export const getOwnTweets = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.find({userID: req.userID})
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.status(200).json(result.map(data => {
                    return {
                        tweet: data.tweet,
                        id: data.id.toString("hex"),
                        likes: data.likes.map(r => {
                            return {
                                userID: r.user?.ID.toString("hex"),
                                username: r.user?.name,
                            }
                        }),
                        likeCount: data.likes.length,
                        comments:  data.comments.map(r => {
                            return {
                                userID: r.user?.ID.toString("hex"),
                                username: r.user?.name,
                                comment: r.comment,
                            }
                        }),
                    }
                    
                }));
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

export const likeTweet = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.findOneAndUpdate({id: req.params.id}, {
        $push: {likes: {
            user: {
                ID: req.userID,
                name: req.username
            }
        }}
    })
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.status(200).json(
                    {
                        tweet: result.tweet,
                        id: result.id?.toString("hex"),
                        likes: result.likes.map(r => {
                            return {
                                userID: r.user?.ID?.toString("hex"),
                                username: r.user?.name,
                            }   
                        }),
                        likeCount: result.likes.length,
                        comments:  result.comments.map(r => {
                            return {
                                userID: r.user?.ID?.toString("hex"),
                                username: r.user?.name,
                                comment: r.comment,
                            }
                        }),
                    }
                );
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

export const commentTweet = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.findOneAndUpdate({id: req.params.id}, {
        $push: {comments: {
            user: {
                ID: req.userID,
                name: req.username
            },
            comment: req.body.comment
        }}
    })
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.status(200).json(
                    {
                        tweet: result.tweet,
                        id: result.id?.toString("hex"),
                        likes: result.likes.map(r => {
                            return {
                                userID: r.user?.ID?.toString("hex"),
                                username: r.user?.name,
                            }   
                        }),
                        likeCount: result.likes.length,
                        comments:  result.comments.map(r => {
                            return {
                                userID: r.user?.ID?.toString("hex"),
                                username: r.user?.name,
                                comment: r.comment,
                            }
                        }),
                    }
                );
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

