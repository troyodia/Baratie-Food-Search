import { axiosInstance } from "@/axios/axiosInstance";
import { isAxiosError } from "axios";
import { CREATE_RESTURANT, GET_RESTURANT, UPDATE_RESTURANT } from "./URLS";
import { CreatedResturant } from "@/types/resturantTypes";

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
export const updateMyResturant = async (
  formData: FormData
): Promise<string | undefined> => {
  try {
    const res = await axiosInstance.post<{ msg: string }>(
      UPDATE_RESTURANT,
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

export const getMyResturant = async (): Promise<
  CreatedResturant | undefined
> => {
  try {
    const res = await axiosInstance.get<{ restruant: CreatedResturant }>(
      GET_RESTURANT
    );
    console.log(res);
    if (res.data && res.status === 200) {
      return res.data.restruant;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 500) {
      console.log(error.response?.data);
      throw new Error(error.response?.data.msg);
    }
  }
};
