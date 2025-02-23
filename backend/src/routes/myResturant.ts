import express from "express";
import { upload } from "../middleware/multer";
import { createResturant, getMyResturant } from "../controllers/resturant";
export const resturantRouter = express.Router();
resturantRouter
  .route("/create-resturant")
  .post(upload.single("image"), createResturant);
resturantRouter.route("/get-resturant").get(getMyResturant);
