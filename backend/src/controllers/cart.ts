import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import mongoose from "mongoose";
import { Cart } from "../models/Cart";
import { Resturant } from "../models/Resturant";
type CartReqBody = {
  //delivery and name
  restaurantId: string;
  details: { name: string; quantity: number; price: string }[];
};
export const updateCart = async (
  req: Request<{}, {}, CartReqBody>,
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
  let cartCount = 0;
  if (cart.length < 1) {
    res.status(StatusCodes.OK).json({
      checkoutCart: {
        restaurantName: "emtpy",
        restaurantId: "emtpy",
        address: "emtpy",
        cart,
        subTotal: 0,
        cartCount,
      },
    });
    return;
  }
  const restaurant = await Resturant.findById(cart[0].restaurantId);

  if (!restaurant) {
    throw new BadRequestError("Restaurant does not exist");
  }
  let subTotal = restaurant.deliveryPrice;
  cart.forEach((item) => {
    subTotal += parseFloat(item.price) * item.quantity;
    cartCount += item.quantity;
  });
  console.log(restaurant._id);

  res.status(StatusCodes.OK).json({
    checkoutCart: {
      restaurantName: restaurant.name,
      restaurantId: restaurant._id,
      address: restaurant.city,
      cart,
      subTotal,
      cartCount,
    },
  });
};
export const createNewOrder = async (
  req: Request<{}, {}, CartReqBody>,
  res: Response
) => {
  const { restaurantId, details } = req.body;
  if (!restaurantId || details.length < 1) {
    console.log("error", restaurantId, details);
    throw new BadRequestError("Invalid Cart entry");
  }
  await Cart.deleteMany({});
  const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);
  details.forEach(async (detail) => {
    await Cart.create({
      restaurantId: restaurantObjectId,
      quantity: detail.quantity,
      price: detail.price,
      menuItem: detail.name,
    });
  });
  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const updateCartItemQuantity = async (
  req: Request<{ id: string }, {}, { quantity: number }>,
  res: Response
) => {
  const { quantity } = req.body;
  const { id } = req.params;
  console.log(quantity, id);
  if (!quantity || !id) {
    throw new BadRequestError("Error updating Cart item quantity");
  }
  await Cart.findByIdAndUpdate(id, { quantity: quantity });
  res.status(StatusCodes.OK).json({ msg: "success" });
};
export const deleteFromCart = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Error deleting Cart item");
  }
  await Cart.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "success" });
};
