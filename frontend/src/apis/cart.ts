import { axiosInstance } from "@/axios/axiosInstance";
import { Cart, CheckOutCart } from "@/types/resturantTypes";
import { isAxiosError } from "axios";
import {
  CREATE_NEW_CART,
  DELETE_CART_ITEM,
  GET_CART,
  UPDATE_CART,
  UPDATE_CART_ITEM_QTY,
} from "./URLS";

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

export const createNewOrder = async (cart: Cart) => {
  try {
    const res = await axiosInstance.post<{ msg: string }>(
      CREATE_NEW_CART,
      cart
    );
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
export const updateCartItemQty = async (quantity: number, id: string) => {
  try {
    const res = await axiosInstance.post<{ msg: string }>(
      UPDATE_CART_ITEM_QTY + id,
      { quantity }
    );
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
export const deleteCartItem = async (id: string) => {
  try {
    const res = await axiosInstance.delete<{ msg: string }>(
      DELETE_CART_ITEM + id
    );
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
