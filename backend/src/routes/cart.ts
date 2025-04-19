import express from "express";
import { updateCart, getCart, createNewOrder } from "../controllers/cart";

export const cartRouter = express.Router();

cartRouter.route("/update-cart").post(updateCart);
cartRouter.route("/create-new-order").post(createNewOrder);
cartRouter.route("/get-cart").get(getCart);
