import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
import { oauth2client } from "../utils/googleapis";
import axios from "axios";
import { User } from "../models/User";
import { GoogleUserInfo } from "../responseTypes/authTypes";

export const signUpUserForm = async (req: Request, res: Response) => {
  res.json({ msg: "works" });
};

export const loginUserGoogle = async (req: Request, res: Response) => {
  const { code } = req.query;
  if (!code) {
    throw new BadRequestError("Google code not provided for Sign up");
  }
  const googleResponse = await oauth2client.getToken(code as string);
  oauth2client.setCredentials(googleResponse.tokens);

  const userResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
  );

  const { email, name }: GoogleUserInfo = userResponse.data;

  const registeredUser = await User.findOne({ email });
  if (!registeredUser) {
    // testUser = await User.create({
    //   email: email,
    //   firstname: name.split(" ")[0],
    //   lastname: name.split(" ")[1],
    // });
    throw new BadRequestError(
      "Email and Password do not exist, please Sign up"
    );
  }

  const token = registeredUser.generateJwtToken(
    process.env.ACCESS_SECRET as string
  );
  res.status(StatusCodes.OK).json({ registeredUser });
};
