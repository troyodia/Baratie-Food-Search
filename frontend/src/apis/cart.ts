import { axiosInstance } from "@/axios/axiosInstance";
import { Cart, CheckOutCart } from "@/types/resturantTypes";
import { isAxiosError } from "axios";
import { GET_CART, UPDATE_CART } from "./URLS";

export const updateCart = async (cart: Cart) => {
  try {
    const res = await axiosInstance.post<{ msg: string }>(UPDATE_CART, cart);
    if (res.data && res.status === 200) {
      console.log(res.data.msg);
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 500) {
      throw new Error(error.response?.data.msg);
    }
  }
};
export const getCart = async () => {
  try {
    const res = await axiosInstance.get<{ checkoutCart: CheckOutCart }>(
      GET_CART
    );
    if (res.data && res.status === 200) {
      console.log(res.data);
      return res.data.checkoutCart;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 500) {
      console.log(error.response?.data);
      throw new Error(error.response?.data.msg);
    }
  }
};
