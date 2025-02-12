import axios from "axios";
import { BASE_URL } from "./URLS";
import { LoginUserInfo } from "../types/authTypes";

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
