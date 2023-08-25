import mongoose from "mongoose";
import {randomUUID} from "crypto"

const Schema = mongoose.Schema;

const tweetSchema = new Schema(
    {
        id:{
            type: 'UUID',
            default: () => randomUUID()
        },
        userID:{
            type:'UUID',
            required:true
        },
        tweet: {
            type: String,
            required: true,
          },
        isDeleted:{
            type:Boolean,
            default:false
        },
        likes: [
            {
                user:{
                    ID: {
                        type: "UUID",
                        required: true,
                      },
                    name: {
                        type: String,
                        required: true,
                      }
                }
            },
          ],
          comments: [
            {
                user:{
                    ID: {
                        type: "UUID",
                        required: true,
                      },
                    name: {
                        type: String,
                        required: true,
                      }
                }
              ,
              comment: {
                type: String,
                required: true,
              },
            },
          ],
    }
)
const TweetModel = mongoose.model('tweet',tweetSchema)

export default TweetModel;