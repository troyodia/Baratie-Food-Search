import axios, { isAxiosError } from "axios";
import { BASE_URL, SIGN_UP_URL, LOGIN_URL } from "./URLS";
import {
  LoginUserInfo,
  SignUpandLoginFormDataType,
  ValidatedUser,
} from "../types/authTypes";

export const googleAuth = async (
  code: string,
  errorFunc: () => void
): Promise<LoginUserInfo | undefined> => {
  try {
    const res = await axios.get<LoginUserInfo>(
      `${BASE_URL}/api/v1/auth/login-user-google?code=${code}`,
      {
        withCredentials: true,
      }
    );
    if (res.data && res.status === 200) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    console.log(error);
    errorFunc();
    return undefined;
  }
};

export const signUpUser = async (
  signUpData: SignUpandLoginFormDataType
): Promise<ValidatedUser | undefined> => {
  try {
    const res = await axios.post<{ user: ValidatedUser }>(
      SIGN_UP_URL,
      signUpData,
      {
        withCredentials: true,
      }
    );
    if (res.data && res.status === 200) {
      console.log(res.data);
      return res.data.user;
    }
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) throw new Error(error.response?.data.msg);
    return;
  }
};

export const loginUser = async (
  loginData: SignUpandLoginFormDataType
): Promise<{ user: ValidatedUser; token: string } | undefined> => {
  try {
    const res = await axios.post<{ user: ValidatedUser; token: string }>(
      LOGIN_URL,
      loginData,
      { withCredentials: true }
    );

    if (res.data && res.status === 200) {
      console.log(res.data);
      return res.data;
    }
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.msg);
    return;
  }
};
