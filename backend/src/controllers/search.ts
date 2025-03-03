import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { Resturant } from "../models/Resturant";
type QueryParameter = {
  search?: string;
  sortBy?: "best_match" | "delivery_price" | "estimated_delivery_time";
  cuisineFilter?: string;
  page?: string;
};
type FilterQuery = {
  cuisineItems?: string;
  // city?: RegExp;
  // city?: string;
};
const NUMBERS_PER_PAGE = 3;
export const searchForRestrauant = async (
  req: Request<{}, {}, {}, QueryParameter>,
  res: Response
) => {
  const { search, sortBy, cuisineFilter, page } = req.query;
  if (!search) {
    res.status(StatusCodes.OK).json({ restrauants: [] });
    return;
  }
  const query: FilterQuery = {};
  if (cuisineFilter) {
    query.cuisineItems = cuisineFilter.toLowerCase();
  }

  const searchRegex = new RegExp(search, "i");
  const sortOptions = {
    best_match: "name",
    delivery_price: "deliveryPrice",
    estimated_delivery_time: "deliveryTime",
  };
  console.log(query, sortOptions[sortBy!], page);
  const restrauants = await Resturant.find({
    $and: [
      {
        $or: [
          { cuisineItems: searchRegex },
          { city: searchRegex },
          { name: searchRegex },
        ],
      },
      query,
    ],
  })
    .sort([[sortOptions[sortBy!], "asc"]])
    .limit(NUMBERS_PER_PAGE)
    .skip(page ? NUMBERS_PER_PAGE * (parseInt(page) - 1) : 1);
  console.log(restrauants);
  const resturantCount = await Resturant.countDocuments({
    $and: [
      {
        $or: [
          { cuisineItems: searchRegex },
          { city: searchRegex },
          { name: searchRegex },
        ],
      },
      query,
    ],
  });
  // console.log(restrauants);
  res.status(StatusCodes.OK).json({ restrauants, resturantCount });
};
