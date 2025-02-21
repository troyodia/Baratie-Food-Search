import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { CreateResturantBody } from "../types/resturant";

export const createResturant = (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("Body noew provided in request");
  if (!req.file) throw new BadRequestError("File does not exist");
  const {
    cuisineItems,
    menu,
    name,
    city,
    country,
    deliveryPrice,
    deliveryTime,
  }: CreateResturantBody = req.body;
  if (
    cuisineItems ||
    menu ||
    name ||
    city ||
    country ||
    deliveryPrice ||
    deliveryTime
  )
    throw new BadRequestError("Body sent with request missing parameters");

  console.log(req.body);
  console.log(req.file);
};
