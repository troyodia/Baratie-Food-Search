import express from "express";
import { signUpUserForm, signUpUserGoogle } from "../controllers/auth";
export const authRouter = express.Router();

authRouter.route("/sign-up-user-form").post(signUpUserForm);
authRouter.route("/sign-up-user-google").post(signUpUserGoogle);
