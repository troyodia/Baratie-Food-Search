import {
  createNewOrder,
  deleteCartItem,
  getCart,
  updateCart,
  updateCartItemQty,
} from "@/apis/cart";
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

export const useUpdateCartItemQty = (
  notify: (message: string, type: TypeOptions) => void
) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      quantity,
      id,
    }: {
      quantity: number;
      id: string;
    }): Promise<void> => updateCartItemQty(quantity, id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      notify(error.message, "error");
    },
  });
};
export const useDeleteCartItem = (
  notify: (message: string, type: TypeOptions) => void
) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }): Promise<void> => deleteCartItem(id),
    onSuccess: () => {
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
