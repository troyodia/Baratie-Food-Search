import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { oauth2client } from "../utils/googleapis";
import axios from "axios";
import { User } from "../models/User";
import { GoogleUserInfo } from "../types/authTypes";

export const signUpUserForm = async (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("request body not provided");
  const {
    firstname,
    lastname,
    email,
    password,
  }: { firstname: string; lastname: string; email: string; password: string } =
    req.body;
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });
  if (!user) {
    throw new BadRequestError("user not craeted");
  }
  const accessToken = user.generateJwtToken(
    process.env.ACCESS_SECRET as string,
    process.env.ACCESS_LIFETIME as string
  );
  const refreshToken = user.generateJwtToken(
    process.env.REFRESH_SECRET as string,
    process.env.REFRESH_LIFETIME as string
  );
  res.cookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("REFRESH_TOKEN", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ user });
};
export const loginUserForm = async (req: Request, res: Response) => {
  if (!req.body) throw new BadRequestError("request body not provided");
  const { email, password }: { email: string; password: string } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new BadRequestError("Email does not exist, please Sign up");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new BadRequestError("incorrect Password entered");

  const accessToken = user.generateJwtToken(
    process.env.ACCESS_SECRET as string,
    process.env.ACCESS_LIFETIME as string
  );
  const refreshToken = user.generateJwtToken(
    process.env.REFRESH_SECRET as string,
    process.env.REFRESH_LIFETIME as string
  );
  console.log(accessToken, refreshToken);
  res.cookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("REFRESH_TOKEN", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ user, token: req.cookies.ACCESS_TOKEN });
};
export const loginUserGoogle = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    throw new BadRequestError("Google code not provided for Sign up");
  }
  const googleResponse = await oauth2client.getToken(code as string);
  oauth2client.setCredentials(googleResponse.tokens);

  const userResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`,
    { withCredentials: true }
  );

  const { email, name }: GoogleUserInfo = userResponse.data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError(
      "Email and Password do not exist, please Sign up"
    );
  }
  // const accessToken = googleResponse.tokens.access_token;
  // const refreshToken = googleResponse.tokens.refresh_token;

  //set as google acccess token
  const accessToken = user.generateJwtToken(
    process.env.ACCESS_SECRET as string,
    process.env.ACCESS_LIFETIME as string
  );
  const refreshToken = user.generateJwtToken(
    process.env.REFRESH_SECRET as string,
    process.env.REFRESH_LIFETIME as string
  );
  console.log(accessToken, refreshToken);
  res.cookie("ACCESS_TOKEN", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,
  });
  res.cookie("REFRESH_TOKEN", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({ user, token: req.cookies.ACCESS_TOKEN });
};
