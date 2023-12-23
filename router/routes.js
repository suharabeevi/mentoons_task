import { Router } from "express";
import { usercontroller } from "../controllers/usercontroller.js";
import { ProductController } from "../controllers/productcontroller.js";
import upload from "../utils/multer.js";
const userRouter =Router()
const UserController = usercontroller()
const Productontroller = ProductController()


// userlogin and signup
userRouter.route('/usersignup').post(UserController.adduser).get(UserController.getuser)
// adding product and getting all the product
userRouter.route('/addproduct').post(upload,Productontroller.addproduct).get(Productontroller.getallproducts)


export default userRouter