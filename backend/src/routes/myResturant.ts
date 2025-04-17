import express from "express";
import { upload } from "../middleware/multer";
import {
  createMyResturant,
  getMyResturant,
  updateMyResturant,
  getSearchedRestaurant,
} from "../controllers/resturant";
export const resturantRouter = express.Router();
resturantRouter
  .route("/create-resturant")
  .post(upload.single("image"), createMyResturant);

resturantRouter
  .route("/update-resturant")
  .post(upload.single("image"), updateMyResturant);

resturantRouter.route("/get-resturant").get(getMyResturant);
resturantRouter.route("/:restaurantId").get(getSearchedRestaurant);
