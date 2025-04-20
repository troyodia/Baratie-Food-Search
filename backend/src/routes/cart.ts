import express from "express";
import {
  updateCart,
  getCart,
  createNewOrder,
  updateCartItemQuantity,
  deleteFromCart,
} from "../controllers/cart";

export const cartRouter = express.Router();

cartRouter.route("/update-cart").post(updateCart);
cartRouter.route("/create-new-order").post(createNewOrder);
cartRouter.route("/update-quantity/:id").post(updateCartItemQuantity);
cartRouter.route("/delete-cart-item/:id").delete(deleteFromCart);
cartRouter.route("/get-cart").get(getCart);
