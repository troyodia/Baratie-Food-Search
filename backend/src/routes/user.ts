import express from "express";
import { signUpUserForm, loginUserGoogle } from "../controllers/auth";
export const authRouter = express.Router();

authRouter.route("/sign-up-user-form").post(signUpUserForm);
authRouter.route("/login-user-google").get(loginUserGoogle);
