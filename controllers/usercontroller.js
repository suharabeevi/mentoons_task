import AppError from "../utils/appError.js";
import { HttpStatus } from "../config/httpStatus.js";
import User from "../databse/models/userModel.js";
import bcrypt from "bcrypt";
export const usercontroller = () => {
  const adduser = async (req, res, next) => {
    try {
      // console.log(req.body);
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        const err = new AppError("missing credentials", HttpStatus.BAD_REQUEST);
        return next(err);
      }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const err = new AppError("user already exist", HttpStatus.BAD_REQUEST);
        return next(err);
      }
      // adding new user
      const newuser = await User.create({
        username,
        password,
        email,
      });
      res
        .status(HttpStatus.CREATED)
        .json({ messege: "user adder successfully", newuser });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ messege: "Internal server Error" + error });
    }
  };
  const getuser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        const err = new AppError("missing credentials", HttpStatus.BAD_REQUEST);
        return next(err);
      }
      const user = await User.findOne({ email: email });
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          const err = new AppError(
            "incorrect password",
            HttpStatus.BAD_REQUEST
          );
          return next(err);
        }
        var token = user.generateAuthToken();
        res.status(HttpStatus.OK).json({
          message: "Get user successfully",
          user: {
            id: user._id,
            email: user.email,
            token
            // Add other user properties as needed
          },
        });
      } else {
        const err = new AppError("User not found", HttpStatus.NOT_FOUND);
        return next(err);
      }
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ messege: "Internal server Error" + error });
    }
  };

  return {
    adduser,
    getuser,
    
  };
}