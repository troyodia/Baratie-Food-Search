import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const notFoundErrorMiddleware = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "route not found" });
};
