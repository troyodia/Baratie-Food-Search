import {
  useDeleteCartItem,
  useGetCart,
  useUpdateCartItemQty,
} from "@/hooks/cart";
import { X, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ButtonBorderBlue from "./ButtonBorderBlue";
import { notify } from "@/utils/notify";
import { Skeleton } from "./ui/skeleton";

export default function CartButton() {
  const {
    data: checkoutCart,
    isError: getCartError,
    isPending: getCartPending,
  } = useGetCart();
  const { mutate: updateItemQty, isPending: updateQtyPending } =
    useUpdateCartItemQty(notify);
  const { mutate: deleteCartItem, isPending: deleteCartItemPending } =
    useDeleteCartItem(notify);
  return (
    <main className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative outline-0 border-0">
            <ShoppingCart className="hover:text-[#75AAF0] text-black lg:text-white transition-all outline-transparent" />
            <div className="absolute -top-3 -right-4 rounded-full w-6 h-6 bg-[#75AAF0] flex justify-center items-center font-bold text-black">
              {checkoutCart && !getCartError && checkoutCart.cart.length > 0
                ? checkoutCart.cartCount > 9
                  ? "9+"
                  : checkoutCart.cartCount
                : 0}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96">
          {checkoutCart && checkoutCart.cart.length > 0 ? (
            <section className="w-full flex flex-col">
              <DropdownMenuItem
                className="cursor-pointer h-8 w-8 rounded-full
           bg-black/10 border-2 flex justify-center items-center hover:bg-black/10"
              >
                <X />
              </DropdownMenuItem>
              <DropdownMenuLabel className="flex flex-col text-3xl font-bold mb-2">
                <span>{checkoutCart?.restaurantName}</span>
                <span>({checkoutCart?.address})</span>
              </DropdownMenuLabel>
              <DropdownMenuGroup>
                {getCartPending || updateQtyPending || deleteCartItemPending ? (
                  <section className="flex justify-between mx-2">
                    <Skeleton className="h-5 w-12"></Skeleton>
                    <Skeleton className="h-5 w-16"></Skeleton>
                  </section>
                ) : (
                  <section className="flex justify-between mx-2 text-base">
                    <span className="font-semibold">
                      {checkoutCart?.cartCount} items
                    </span>
                    <span>
                      Subtotal:{" "}
                      <span className="font-semibold">
                        ${checkoutCart?.subTotal.toFixed(2)}
                      </span>
                    </span>
                  </section>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="mx-2 my-4">
                {checkoutCart?.cart.map((cartItem, index) => {
                  return (
                    <section key={cartItem._id} className="flex flex-col">
                      <section className="flex gap-6 items-center">
                        <Select
                          onValueChange={(val) => {
                            console.log(val);
                            if (val === "item 0") {
                              console.log(val);
                              deleteCartItem({ id: cartItem._id });
                              return;
                            }
                            const quantity = parseFloat(val.split(" ")[1]);
                            updateItemQty({
                              quantity: quantity,
                              id: cartItem._id,
                            });
                          }}
                        >
                          <SelectTrigger className="w-14 h-8 rounded-full bg-black/5">
                            <SelectValue
                              placeholder={cartItem.quantity}
                              className="font-bold"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 99 }).map((_, index) => {
                              return (
                                <SelectItem key={index} value={"item " + index}>
                                  {index === 0 ? "Remove" : index}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <section className="flex flex-1 justify-between">
                          <span className="font-semibold">
                            {cartItem.menuItem}
                          </span>
                          <span className="">
                            {getCartPending ||
                            updateQtyPending ||
                            deleteCartItemPending ? (
                              <Skeleton className="w-10 h-5"></Skeleton>
                            ) : (
                              "$" +
                              (
                                parseFloat(cartItem.price) * cartItem.quantity
                              ).toFixed(2)
                            )}
                          </span>
                        </section>
                      </section>
                      {index !== checkoutCart.cart.length - 1 && (
                        <DropdownMenuSeparator className="my-4" />
                      )}
                    </section>
                  );
                })}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ButtonBorderBlue btnFn={() => console.log("click")}>
                  Go To Checkout
                </ButtonBorderBlue>
              </DropdownMenuItem>
            </section>
          ) : (
            <section className="flex flex-col w-full  gap-4">
              <DropdownMenuItem
                className="cursor-pointer h-8 w-8 rounded-full
           bg-black/10 border-2 flex justify-center items-center hover:bg-black/10"
              >
                <X />
              </DropdownMenuItem>
              <section className="flex flex-col gap-4 w-full items-center justify-center pt-6 pb-8">
                <ShoppingCart className="text-[#75AAF0] " size={48} />
                <p className="">
                  Start a cart by adding items from a restaurant!
                </p>
              </section>
            </section>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
