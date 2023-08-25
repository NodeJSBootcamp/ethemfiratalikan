//@ts-nocheck

import TweetModel from "../data/tweet/tweet.data"
import tweetRouter from "../router/tweet.router";
import { Request, Response, NextFunction } from "express"

export const tweetOwnerCheck =  (req:Request, res:Response, next:NextFunction) =>{
    try {
        const tweetID = req.params.id
        console.log("userID", req.userID)
        TweetModel.findOne({id: tweetID, userID: req.userID}).then(tweet => {
            console.log("tweeeeet", tweet)
            if (!tweet) {
                return res.status(400).json({message: "Tweet not found."})
            }
            next()
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred'})
    }
}

export const tweetNotOwnerCheck =  (req:Request, res:Response, next:NextFunction) =>{
    try {
        const tweetID = req.params.id
        console.log("userID", req.userID)
        TweetModel.findOne({id: tweetID}).then(tweet => {
            console.log("tweeeeet", tweet)
            if (!tweet) {
                return res.status(400).json({message: "Tweet not found."})
            }

            if (req.userID === tweet.userID) {
                return res.status(400).json({message: "You can not do that operation to your own tweet"})
            }
            next()
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred'})
    }
}