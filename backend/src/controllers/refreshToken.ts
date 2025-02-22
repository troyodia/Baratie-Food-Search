import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError, UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.REFRESH_TOKEN;
  // console.log(refreshToken);
  if (!refreshToken)
    throw new UnauthenticatedError("refresh token does not exist");
  const payload = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET as string
  );
  if (!payload)
    throw new BadRequestError("unable to generate new access token");
  const { email, userId } = payload as { email: string; userId: string };
  const user = await User.findOne({ _id: userId });
  if (!user) throw new BadRequestError("No user found");
  // console.log(payload);
  const accessToken = jwt.sign(
    {
      email: user.email,
      userId,
    },
    process.env.ACCESS_SECRET as string,
    { expiresIn: "2m" }
  );
  res.cookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
    // maxAge: 2 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ token: req.cookies.ACCESS_TOKEN });
};
