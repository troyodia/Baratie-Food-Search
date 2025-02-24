import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { ResturantBody } from "../types/resturant";
import { v2 as cloudinary } from "cloudinary";
import { Resturant } from "../models/Resturant";
import mongoose from "mongoose";
import { getCloudinaryURL } from "../utils/cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createMyResturant = async (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("Body noew provided in request");
  if (!req.file) throw new BadRequestError("File does not exist");
  if (!req.user) throw new BadRequestError("req.user does not exist");
  const {
    cuisineItems,
    menu,
    name,
    city,
    country,
    deliveryPrice,
    deliveryTime,
  }: ResturantBody = req.body;

  if (
    !cuisineItems ||
    !menu ||
    !name ||
    !city ||
    !country ||
    !deliveryPrice ||
    !deliveryTime
  )
    throw new BadRequestError("Body sent with request missing parameters");

  const ownerId = new mongoose.Types.ObjectId(req.user.userId);
  const optimizeUrl = await getCloudinaryURL(req.file);
  const newResuturant = await Resturant.create({
    name: name,
    owner: ownerId,
    cuisineItems: JSON.parse(cuisineItems),
    menu: JSON.parse(menu),
    city: city,
    country: country,
    deliveryPrice: parseFloat(deliveryPrice),
    deliveryTime: parseFloat(deliveryTime),
    image: optimizeUrl,
    lastUpdated: new Date(),
  });
  if (!newResuturant) {
    throw new BadRequestError("Cannot create restruant");
  }

  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const getMyResturant = async (req: Request, res: Response) => {
  if (!req.user) throw new BadRequestError("req.user does not exist");

  const restruant = await Resturant.findOne({ owner: req.user.userId });

  if (!restruant) throw new BadRequestError("Your Resturant does nto exist");

  res.status(StatusCodes.OK).json({ restruant });
};

export const updateMyResturant = async (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("Body noew provided in request");
  if (!req.user) throw new BadRequestError("req.user does not exist");
  const {
    cuisineItems,
    menu,
    name,
    city,
    country,
    deliveryPrice,
    deliveryTime,
  }: ResturantBody = req.body;

  if (
    !cuisineItems ||
    !menu ||
    !name ||
    !city ||
    !country ||
    !deliveryPrice ||
    !deliveryTime
  )
    throw new BadRequestError("Body sent with request missing parameters");

  const resturant = await Resturant.findOne({
    owner: req.user.userId,
  });
  console.log(resturant, req.user.userId);

  if (!resturant) throw new BadRequestError("Your Resturant does not exist");

  resturant.name = name;
  resturant.cuisineItems = JSON.parse(cuisineItems);
  resturant.country = country;
  resturant.city = city;
  resturant.menu = JSON.parse(menu);
  resturant.deliveryPrice = parseFloat(deliveryPrice);
  resturant.deliveryTime = parseFloat(deliveryTime);
  resturant.lastUpdated = new Date();

  if (req.file) {
    const optimizeUrl = await getCloudinaryURL(req.file);
    resturant.image = optimizeUrl;
  }
  resturant.save();
  res.status(StatusCodes.OK).json({ msg: "restruant info updated" });
};
