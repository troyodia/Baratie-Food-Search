import axios, { isAxiosError } from "axios";
import {
  BASE_URL,
  SIGN_UP_URL,
  LOGIN_URL,
  GET_AUTH_USER_URL,
  REFRESH_URL,
  LOGOUT_URL,
} from "./URLS";
import {
  AuthorizedUser,
  SignUpandLoginFormDataType,
  ValidatedUser,
} from "../types/authTypes";
import { axiosInstance } from "@/axios/axiosInstance";

export const googleAuth = async (
  code: string,
  errorFunc: () => void
): Promise<{ user: ValidatedUser; token: string } | undefined> => {
  try {
    const res = await axios.get<{ user: ValidatedUser; token: string }>(
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
): Promise<{ user: ValidatedUser; token: string } | undefined> => {
  try {
    const res = await axios.post<{ user: ValidatedUser; token: string }>(
      SIGN_UP_URL,
      signUpData,
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
export const refreshToken = async (): Promise<string | undefined> => {
  try {
    const res = await axios.get<{ token: string }>(REFRESH_URL, {
      withCredentials: true,
    });
    if (res.data && res.status === 200) {
      return res.data.token;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.msg);
    }
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.get<{ msg: string }>(LOGOUT_URL);
    console.log(res.data.msg);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.msg);
    }
  }
};

export const getAuthorizedUser = async (): Promise<
  AuthorizedUser | undefined
> => {
  try {
    const res = await axiosInstance.get<{ user: AuthorizedUser }>(
      GET_AUTH_USER_URL
    );
    if (res.data && res.status === 200) {
      console.log(res.data.user);
      return res.data.user;
    }
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.msg);
  }
};
