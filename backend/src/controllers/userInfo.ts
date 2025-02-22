import { Response, Request } from "express";
import { User } from "../models/User";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { ProfileRequestBody } from "../types/authTypes";

export const getAuthorizedUser = async (req: Request, res: Response) => {
  if (!req.user) throw new BadRequestError("req.user does not exist");
  const user = await User.findOne({
    _id: req.user.userId,
  });
  // console.log(user);
  if (!user) throw new BadRequestError("user not found");
  res.status(StatusCodes.OK).json({ user });
  // console.log("get user route", req.user?.userId);
};
export const updateUserProfile = async (
  req: Request<{}, {}, ProfileRequestBody>,
  res: Response
) => {
  if (!req.body) {
    throw new BadRequestError("Profile information not provided");
  }
  console.log(req.body);
  const { email, firstname, lastname, address, city, country } = req.body;
  if (!email || !firstname || !lastname || !address || !city || !country)
    throw new BadRequestError("invaild body");

  const { userId } = req.user!;
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { email, firstname, lastname, address, city, country },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) throw new BadRequestError("user not found to update profile");

  // console.log(user);
  res.status(StatusCodes.OK).json({ user });
};
