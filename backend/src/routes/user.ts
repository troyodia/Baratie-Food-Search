import express from "express";
import {
  signUpUserForm,
  loginUserGoogle,
  loginUserForm,
} from "../controllers/auth";
import { refreshToken } from "../controllers/refreshToken";
import { getAuthorizedUser } from "../controllers/userInfo";
import { authorizeRoute } from "../middleware/authorize";
export const authRouter = express.Router();

authRouter.route("/sign-up-user").post(signUpUserForm);
authRouter.route("/login-user-google").get(loginUserGoogle);
authRouter.route("/login-user").post(loginUserForm);
authRouter.route("/refresh-access-token").get(refreshToken);
authRouter
  .route("/authorized-user-info")
  .get(authorizeRoute, getAuthorizedUser);
