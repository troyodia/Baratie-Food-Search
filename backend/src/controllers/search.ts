import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { Resturant } from "../models/Resturant";
type QueryParameter = {
  search?: string;
  sortBy?: "best_match" | "delivery_price" | "estimated_delivery_time";
  cuisineFilter?: string;
};
type FilterQuery = {
  cuisineItems?: string;
  city?: RegExp;
  // city?: string;
};
export const searchForRestrauant = async (
  req: Request<{}, {}, {}, QueryParameter>,
  res: Response
) => {
  // if (!req.query) {
  //   throw new BadRequestError("url parameter required");
  // }
  const { search, sortBy, cuisineFilter } = req.query;
  const query: FilterQuery = {};
  if (cuisineFilter) {
    query.cuisineItems = cuisineFilter.toLowerCase();
  }
  if (search) {
    query.city = new RegExp(search, "i");
    // query.city = search;
  }
  const sortOptions = {
    best_match: "name",
    delivery_price: "deliveryPrice",
    estimated_delivery_time: "deliveryTime",
  };
  console.log(query, sortOptions[sortBy!]);
  const restrauants = await Resturant.find(query).sort([
    [sortOptions[sortBy!], "asc"],
  ]);
  console.log(restrauants);
  res.status(StatusCodes.OK).json({ restrauants });
};
