import { axiosInstance } from "@/axios/axiosInstance";
import { isAxiosError } from "axios";
import { SEARCH_FOR_RESTAURANT } from "./URLS";
import { CreatedResturant, FilterRestaurants } from "@/types/resturantTypes";

export const searchForRestaurant = async (
  params: FilterRestaurants
): Promise<CreatedResturant[] | undefined> => {
  try {
    const res = await axiosInstance.get<{ restrauants: CreatedResturant[] }>(
      SEARCH_FOR_RESTAURANT,
      { params: params }
    );
    if (res.data && res.status === 200) {
      console.log(res.data.restrauants);
      return res.data.restrauants;
    }
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.response?.data.msg);
    return;
  }
};
