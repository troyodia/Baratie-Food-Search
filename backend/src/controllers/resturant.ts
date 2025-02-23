import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { CreateResturantBody } from "../types/resturant";
import { v2 as cloudinary } from "cloudinary";
import { Resturant } from "../models/Resturant";
import mongoose from "mongoose";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createResturant = async (req: Request, res: Response) => {
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
  }: CreateResturantBody = req.body;

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

  const b64 = Buffer.from(req.file.buffer)?.toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const uplaodResult = await cloudinary.uploader
    .upload(dataURI, {
      public_id: "resturant-image",
      resource_type: "auto",
      folder: "food-app-cloudinary-uploads",
    })
    .catch((err) => {
      console.log("issue with cloudinary");
      throw new BadRequestError(err);
    });
  const optimizeUrl = cloudinary.url("resturant-image", {
    fetch_format: "auto",
    quality: "auto",
  });
  const resturant = await Resturant.findOne({
    owner: req.user.userId,
  });
  console.log(resturant);
  if (resturant) {
    resturant.image = optimizeUrl;
    resturant.name = name;
    resturant.cuisineItems = JSON.parse(cuisineItems);
    resturant.country = country;
    resturant.city = city;
    resturant.menu = JSON.parse(menu);
    resturant.deliveryPrice = parseInt(deliveryPrice);
    resturant.deliveryTime = parseInt(deliveryTime);
    resturant.save();
    res.status(StatusCodes.OK).json({ msg: "restruant info updated" });
    return;
  }
  const newResuturant = await Resturant.create({
    name: name,
    owner: req.user.userId,
    cuisineItems: JSON.parse(cuisineItems),
    menu: JSON.parse(menu),
    city: city,
    country: country,
    deliveryPrice: parseInt(deliveryPrice),
    deliveryTime: parseInt(deliveryTime),
    image: optimizeUrl,
  });
  if (!newResuturant) {
    throw new BadRequestError("Cannot create restruant");
  }

  res.status(StatusCodes.OK).json({ mesg: "success" });
};

export const getMyResturant = async (req: Request, res: Response) => {
  if (!req.user) throw new BadRequestError("req.user does not exist");

  const restruant = await Resturant.findOne({ owner: req.user.userId });

  if (!restruant) throw new BadRequestError("No restruant found");

  res.status(StatusCodes.OK).json({ restruant });
};
