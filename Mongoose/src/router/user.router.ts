import express from "express"
import * as userController from "../controller/user.controller"
import { authtenticateForAdmin } from "../middleware/authentication.middleware"
const userRouter = express.Router()


userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)
userRouter.post("/delete",[authtenticateForAdmin],userController.deleteUser)

export default userRouter;