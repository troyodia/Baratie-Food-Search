import axios from "axios";
import { CodeResponse } from "@react-oauth/google";
import { BASE_URL } from "./URLS";
export const googleAuth = async (code: CodeResponse) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/google?code=${code}`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
