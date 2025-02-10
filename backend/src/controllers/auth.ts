import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { BadRequestError } from "../errors";
// import User from "../models/User";
export const signUpUserForm = async (req: Request, res: Response) => {
  res.json({ msg: "works" });
};
export const signUpUserGoogle = async (req: Request, res: Response) => {
  const { gooogleCodeRes } = req.body;
  if (!gooogleCodeRes) {
    throw new BadRequestError("Google code not provided for Sign up");
  }
};
