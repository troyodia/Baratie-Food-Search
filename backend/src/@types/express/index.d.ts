import { Request } from "express-serve-static-core";

export interface User {
  email: string;
  userId: string;
}
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
// declare module "express-serve-static-core" {
//   interface Request {
//     user?: User;
//   }
// }
