import { Response, Request } from "express";
import { User } from "../models/User";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";
export const getAuthorizedUser = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.user?.email,
    _id: req.user?.userId,
  });
  if (!user) throw new BadRequestError("user not found");
  res.status(StatusCodes.OK).json({ user });
};
