import { Router } from "express";
import { usercontroller } from "../controllers/usercontroller.js";

const userRouter =Router()
const UserController = usercontroller()
// userlogin and signup
userRouter.route('/usersignup').post(UserController.adduser).get(UserController.getuser)


export default userRouter