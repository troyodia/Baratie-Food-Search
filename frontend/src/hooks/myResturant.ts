import {
  createMyResturant,
  getMyResturant,
  getSearchedRestaurant,
  updateMyResturant,
} from "@/apis/myResturant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TypeOptions } from "react-toastify";

export const useCreatMyResturant = (
  notify: (message: string, type: TypeOptions) => void,
  userId: string | undefined
) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: createMyResturant,
    onSuccess: () => {
      notify("Resturant Created Successfully", "success");
      client.invalidateQueries({ queryKey: ["restaurant", userId] });
    },
    onError: () => {
      notify("Unable to create Restruant", "error");
    },
  });
};
export const useGetMyResturant = (userId: string) => {
  return useQuery({
    queryKey: ["restaurant", userId],
    queryFn: getMyResturant,
  });
};
export const useUpdateMyResturant = (
  notify: (message: string, type: TypeOptions) => void,
  userId: string | undefined
) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateMyResturant,
    onSuccess: () => {
      notify("Resturant Updated Successfully", "success");
      client.invalidateQueries({ queryKey: ["restaurant", userId] });
    },
    onError: () => {
      notify("Unable to update Resturant", "error");
    },
  });
};

export const useGetSearchedRestaurant = (restaurantId: string) => {
  return useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => getSearchedRestaurant(restaurantId),
  });
};
