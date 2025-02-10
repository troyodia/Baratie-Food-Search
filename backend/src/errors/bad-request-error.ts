import { StatusCodes } from "http-status-codes";

export class BadRequestError extends Error {
  statuscode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    this.name = "Bad Request Error";
  }
}
