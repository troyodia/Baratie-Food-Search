import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import mongoose from "mongoose";
import { Cart } from "../models/Cart";
import { Resturant } from "../models/Resturant";
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

export const getCart = async (req: Request, res: Response) => {
  const cart = await Cart.find({});
  //   console.log(cart);
  const restaurant = await Resturant.findById(cart[0].restaurantId);
  if (!restaurant) {
    throw new BadRequestError("Restaurant does not exist");
  }
  let subTotal = restaurant.deliveryPrice;
  cart.forEach((item) => {
    subTotal += parseFloat(item.price);
  });
  res.status(StatusCodes.OK).json({
    checkoutCart: {
      restaurantName: restaurant.name,
      restaurantId: restaurant._id,
      address: restaurant.city,
      cart,
      subTotal,
    },
  });
};
