import express from "express";
import { updateCart, getCart } from "../controllers/cart";

export const cartRouter = express.Router();

cartRouter.route("/update-cart").post(updateCart);
cartRouter.route("/get-cart").get(getCart);
