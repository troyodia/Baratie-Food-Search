import axios, { isAxiosError } from "axios";
import { BASE_URL, SIGN_UP_URL } from "./URLS";
import {
  LoginUserInfo,
  SignUpFormDataType,
  SignedUpUser,
} from "../types/authTypes";

// type ApiErrorType = {
//   message: string;
//   status: number;
// };
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
  signUpData: SignUpFormDataType
): Promise<SignedUpUser | undefined> => {
  try {
    const res = await axios.post<{ user: SignedUpUser }>(
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
