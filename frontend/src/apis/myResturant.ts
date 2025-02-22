import { axiosInstance } from "@/axios/axiosInstance";
import { isAxiosError } from "axios";
import { CREATE_RESTURANT } from "./URLS";

export const createMyResturant = async (
  formData: FormData
): Promise<string | undefined> => {
  try {
    const res = await axiosInstance.post<{ msg: string }>(
      CREATE_RESTURANT,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(res);
    return res.data.msg;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 500) {
      console.log(error.response?.data);
      throw new Error(error.response?.data.msg);
    }
  }
};
