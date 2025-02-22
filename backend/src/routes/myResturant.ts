import express from "express";
import { upload } from "../middleware/multer";
import { createResturant } from "../controllers/resturant";
import { authorizeRoute } from "../middleware/authorize";
export const resturantRouter = express.Router();
resturantRouter
  .route("/create-resturant")
  .post(upload.single("image"), authorizeRoute, createResturant);
