import { axiosInstance } from "@/axios/axiosInstance";
import { Cart } from "@/types/resturantTypes";
import { isAxiosError } from "axios";
import { UPDATE_CART } from "./URLS";

export const updateCart = async (cart: Cart) => {
  try {
    const res = await axiosInstance.post<{ msg: string }>(UPDATE_CART, cart);
    if (res.data && res.status === 200) {
      console.log(res.data.msg);
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 500) {
      console.log(error.response?.data);
      throw new Error(error.response?.data.msg);
    }
  }
};
