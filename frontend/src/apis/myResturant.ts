import { axiosInstance } from "@/axios/axiosInstance";
import { isAxiosError } from "axios";
import { CREATE_RESTURANT } from "./URLS";

export const createMyResturant = async (formData: FormData) => {
  try {
    const res = await axiosInstance.post(CREATE_RESTURANT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res);
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.msg);
  }
};
