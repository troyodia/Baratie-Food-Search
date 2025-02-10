import { StatusCodes } from "http-status-codes";

export class UnauthenticatedError extends Error {
  statuscode: StatusCodes = StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
    this.name = "Unathenticated Error";
  }
}
