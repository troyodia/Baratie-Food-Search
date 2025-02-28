import express from "express";
import { searchForRestrauant } from "../controllers/search";
export const searchRouter = express.Router();

searchRouter.route("").get(searchForRestrauant);
