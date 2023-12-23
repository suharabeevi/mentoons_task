import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  productitle: {
    type: String,
    required: true,
  },
  Authorname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productimage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["comics", "podcast", "workshops"],
    required: true,
  },
});
const Product = mongoose.model("Product", productSchema);

export default Product;
