import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError, UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
export const refreshToken = async (req: Request, res: Response) => {
  // const currentAccessToken = req.cookies.ACCESS_TOKEN;
  // if (currentAccessToken) {
  //   // console.log("current access token exists");
  //   res.status(StatusCodes.OK).json({ token: req.cookies.ACCESS_TOKEN });
  //   return;
  // }
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

  const accessToken = jwt.sign(
    {
      email,
      userId,
    },
    process.env.ACCESS_SECRET as string,
    { expiresIn: "1h" }
  );
  res.cookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ token: req.cookies.ACCESS_TOKEN });
};
