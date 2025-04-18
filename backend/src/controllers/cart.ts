import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import mongoose from "mongoose";
import { Cart } from "../models/Cart";
type UpdateCartReqBody = {
  //delivery and name
  restaurantId: string;
  details: { name: string; quantity: number; price: string }[];
};
export const updateCart = async (
  req: Request<{}, {}, UpdateCartReqBody>,
  res: Response
) => {
  const { restaurantId, details } = req.body;
  if (!restaurantId || details.length < 1) {
    console.log("error", restaurantId, details);
    throw new BadRequestError("Invalid Cart entry");
  }
  const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);
  const cart = await Cart.find({});
  if (cart.length > 0) {
    details.forEach(async (detail) => {
      const currentMenuItem = cart.find(
        (item) => item.menuItem === detail.name
      );
      if (currentMenuItem) {
        await Cart.findOneAndUpdate(
          { menuItem: currentMenuItem.menuItem },
          { quantity: detail.quantity + currentMenuItem.quantity }
        );
      }
    });
  }
  //   console.log(details);
  details.forEach(async (detail) => {
    const currentMenuItem = cart.find((item) => item.menuItem === detail.name);

    if (!currentMenuItem) {
      await Cart.create({
        restaurantId: restaurantObjectId,
        quantity: detail.quantity,
        price: detail.price,
        menuItem: detail.name,
      });
    }
  });
  res.status(StatusCodes.OK).json({ msg: "success" });
};
