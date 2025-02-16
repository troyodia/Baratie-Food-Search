import { REFRESH_URL } from "@/apis/URLS";
import axios, { isAxiosError } from "axios";
import { useAppStore } from "@/store";
export default function useRefreshToken() {
  const refreshToken = async () => {
    try {
      const res = await axios.get<{ token: string }>(REFRESH_URL, {
        withCredentials: true,
      });
      if (res.data && res.status === 200) {
        useAppStore.setState((prev) => ({
          userInfo: { ...prev.userInfo!, token: res.data.token },
        }));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.msg);
      }
    }
  };
  return refreshToken;
}
