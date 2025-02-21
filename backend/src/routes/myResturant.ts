import express from "express";
import { upload } from "../middleware/multer";
import { createResturant } from "../controllers/resturant";
export const resturantRouter = express.Router();
resturantRouter
  .route("/create-resturant")
  .post(upload.single("image"), createResturant);
