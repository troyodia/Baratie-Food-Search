import express from "express";
import {
  signUpUserForm,
  loginUserGoogle,
  loginUserForm,
  logoutUser,
} from "../controllers/auth";
import { refreshToken } from "../controllers/refreshToken";
import { getAuthorizedUser, updateUserProfile } from "../controllers/userInfo";
import { authorizeRoute } from "../middleware/authorize";
export const authRouter = express.Router();

authRouter.route("/sign-up-user").post(signUpUserForm);
authRouter.route("/login-user-google").get(loginUserGoogle);
authRouter.route("/login-user").post(loginUserForm);
authRouter.route("/logout-user").get(authorizeRoute, logoutUser);
authRouter.route("/refresh-access-token").get(refreshToken);
authRouter
  .route("/authorized-user-info")
  .get(authorizeRoute, getAuthorizedUser);
authRouter.route("/update-profile").post(authorizeRoute, updateUserProfile);
