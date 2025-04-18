import mongoose from "mongoose";
const CartScehma = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resturant",
    required: true,
  },

  menuItem: {
    type: String,
    required: true,
  },
  quantity: { type: Number, required: true },
  price: {
    type: String,
    required: true,
  },
});

export const Cart = mongoose.model("Cart", CartScehma);
