import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { BadRequestError } from "../errors";
import { User } from "../models/User";
export const authorizeRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.ACCESS_TOKEN;
  if (!accessToken) throw new BadRequestError("user not authorized");
  const user = new User();

  const payload = user.verfiyToken(
    accessToken,
    process.env.ACCESS_SECRET as string
  );
  if (!payload) throw new BadRequestError("cannot verify access token");
  console.log(payload);
  const { email, userId } = payload as { email: string; userId: string };

  req.user = { email, userId };
  next();
};
