import { getCart, updateCart } from "@/apis/cart";
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
      client.invalidateQueries({ queryKey: ["cart", cart.restaurantId] });
    },
    onError: (error) => {
      notify(error.message, "error");
    },
  });
};

//add invalidtion to getter
export const useGetCart = (restaurantId: string | undefined) => {
  return useQuery({
    queryKey: ["cart", restaurantId],
    queryFn: getCart,
  });
};
