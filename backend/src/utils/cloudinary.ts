import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import mongoose from "mongoose";
import { BadRequestError } from "../errors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const getCloudinaryURL = async (
  file: Express.Multer.File
): Promise<string> => {
  const b64 = Buffer.from(file.buffer)?.toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;
  const uplaodResult = await cloudinary.uploader
    .upload(dataURI, {
      resource_type: "auto",
      folder: "food-app-cloudinary-uploads",
    })
    .catch((err) => {
      console.log("issue with cloudinary");
      throw new BadRequestError(err);
    });

  const optimizeUrl = cloudinary.url(uplaodResult.public_id, {
    fetch_format: "auto",
    quality: "auto",
  });
  return optimizeUrl;
};
