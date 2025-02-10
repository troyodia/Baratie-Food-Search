import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
type CustomErrType = {
  msg: string;
  statusCode: StatusCodes;
};
export const errorHandler = (err: any, req: Request, res: Response) => {
  const customErr: CustomErrType = {
    msg: err.message || "something went wrong",
    statusCode: err.statusCode || 500,
  };
  if (err.code && err.code === 11000) {
    customErr.msg = "Email already exists";
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
