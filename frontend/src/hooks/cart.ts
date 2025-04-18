import { updateCart } from "@/apis/cart";
import { Cart } from "@/types/resturantTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      // client.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      notify(error.message, "error");
    },
  });
};

//add invalidtion to getter
