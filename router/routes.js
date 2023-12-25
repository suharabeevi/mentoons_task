import { Router } from "express";
import { usercontroller } from "../controllers/usercontroller.js";
import { ProductController } from "../controllers/productcontroller.js";
import {stripecontroller} from '../controllers/stripecontroller.js'
import upload from "../utils/multer.js";
import verifyToken from "../middleware/Authmiddleware.js";
const userRouter =Router()
const UserController = usercontroller()
const Productcontroller = ProductController()
const StripeController = stripecontroller()


// userlogin and signup
userRouter.route('/usersignup').post(UserController.adduser).get(UserController.getuser)
// adding product and getting all the product
userRouter.route('/addproduct').post(upload,Productcontroller.addproduct).get(Productcontroller.getallproducts)
//getting Product by id
userRouter.route('/getprodcutById/:prodcutId').get(Productcontroller.GetProductById)

userRouter.route('/create-customer').post(StripeController.CraeteNewcustomer)
userRouter.route('/add-card').post(StripeController.addNewCard)
userRouter.route('/Create-Charges').post(StripeController.CraeteNewcustomer)
userRouter.route('/create-checkout-session').post(StripeController.checkout)

export default userRouter