import AppError from "../utils/appError.js";
import { HttpStatus } from "../config/httpStatus.js";
import Product from "../databse/models/productModel.js";
export const ProductController = () => {
  const addproduct = async (req, res, next) => {
    try {
      const { productitle, Authorname, price, category } = req.body;
      let productimage;
      if (req.file) {
        productimage = req.file.path;
      }

      //checks all required data is present
      if (!productitle || !Authorname || !price || !productimage || !category) {
        const err = new AppError(
          "Missing some required data",
          HttpStatus.BAD_REQUEST
        );
        return next(err);
      }
      //create new product document
      const newProduct = await Product.create({
        productitle,
        Authorname,
        price,
        productimage,
        category,
      });
      res
        .status(HttpStatus.CREATED)
        .json({ message: "New product added successfully", newProduct });
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };
  return {
    addproduct,
  };
};
