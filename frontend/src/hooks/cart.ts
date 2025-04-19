import { createNewOrder, getCart, updateCart } from "@/apis/cart";
import { Cart } from "@/types/resturantTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TypeOptions } from "react-toastify";

export const useUpdateCart = (
  cart: Cart,
  notify: (message: string, type: TypeOptions) => void
) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => updateCart(cart),
    onSuccess: () => {
      notify("Cart Updated Successfully", "success");
      client.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      notify(error.message, "error");
    },
  });
};
export const useCreateNewOrder = (
  cart: Cart,
  notify: (message: string, type: TypeOptions) => void
) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => createNewOrder(cart),
    onSuccess: () => {
      notify("New Order craeted Successfully, Cart Updated", "success");
      client.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      notify(error.message, "error");
    },
  });
};
export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
