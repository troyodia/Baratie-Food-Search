import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { Resturant } from "../models/Resturant";
type RequestParameter = {
  search: string;
};
export const searchForRestrauant = async (
  req: Request<RequestParameter>,
  res: Response
) => {
  if (!req.params) {
    throw new BadRequestError("url parameter required");
  }
  const { search } = req.params;
  const restruants = await Resturant.find({ city: search }).collation({
    locale: "en",
    strength: 2,
  });
  res.status(StatusCodes.OK).json({ restruants });
};
