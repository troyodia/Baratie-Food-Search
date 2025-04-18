import express from "express";
import { updateCart } from "../controllers/cart";

export const cartRouter = express.Router();

cartRouter.route("/update-cart").post(updateCart);
