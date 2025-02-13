import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { MongoServerError } from "mongodb";
type CustomErrType = {
  msg: string;
  statusCode: StatusCodes;
};
export const errorHandler = (
  err: MongoServerError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customErr: CustomErrType = {
    msg: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };
  if (err.code && err.code === 11000) {
    customErr.msg = "Email already exists, Please Login";
    customErr.statusCode = 400;
  }
  if (err.name === "ValidationError") {
    customErr.msg =
      "Please " +
      Object.keys(err.errors)
        .map((error) => {
          return err.errors[error].message;
        })
        .join(", ");
    customErr.statusCode = 400;
  }
  res.status(customErr.statusCode).json({ msg: customErr.msg });
};
