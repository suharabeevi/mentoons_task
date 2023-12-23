import mongoose from 'mongoose'
const schema = new mongoose.Schema({
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        products: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true,
            },
            quantity: Number,
            price: Number,
          },
        ],
        totalPrice: {
          type: Number,
        },
      },
      {
        timestamps: true,
      }
    )

const CartModel = mongoose.model("Cart",schema);
export default CartModel;
