//for axios instance
import axios, { isAxiosError } from "axios";
import { BASE_URL, REFRESH_URL } from "@/apis/URLS";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
const generateToken = async () => {
  try {
    await axios.get<{ token: string }>(REFRESH_URL, { withCredentials: true });
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.msg);
    }
  }
};

axiosInstance.interceptors.request.use(
  async (req) => {
    try {
      await generateToken();
      return req;
    } catch (error) {
      console.log("cannot refresh token", error);
    }
    return req;
  },
  (error) => {
    if (error instanceof Error) return Promise.reject(error);
  }
);
