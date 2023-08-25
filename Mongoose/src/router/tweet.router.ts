import express from "express"
import * as tweetController from "../controller/tweet.controller"
import { authtenticateForAdmin,authtenticateUser } from "../middleware/authentication.middleware"
import { tweetOwnerCheck, tweetNotOwnerCheck } from "../middleware/tweet.owner.check.middleware"
const tweetRouter = express.Router()


tweetRouter.post("/",[authtenticateUser],tweetController.saveTweet)

tweetRouter.put("/:id",[authtenticateUser,tweetOwnerCheck],tweetController.updateTweet)
tweetRouter.delete("/:id",[authtenticateUser,tweetOwnerCheck],tweetController.deleteTweet)
tweetRouter.get("/",tweetController.getAllTweets)
tweetRouter.get("/own",[authtenticateUser],tweetController.getOwnTweets)
tweetRouter.post("/:id/like",[authtenticateUser, tweetNotOwnerCheck], tweetController.likeTweet)
tweetRouter.post("/:id/comments",[authtenticateUser, tweetNotOwnerCheck],tweetController.commentTweet)



export default tweetRouter;