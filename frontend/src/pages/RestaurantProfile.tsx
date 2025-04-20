import { useGetSearchedRestaurant } from "@/hooks/myResturant";
import { useParams } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import animationData from "../assets/lottie/food_search_pending.json";
import LoadingLottie from "@/components/Lotties/LoadingLottie";
import Layout from "@/layouts/Layout";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { CircleDashed, Trash } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { useCreateNewOrder, useGetCart, useUpdateCart } from "@/hooks/cart";
import { notify } from "@/utils/notify";
import DialogBox from "@/components/Restaurant Profile/DialogBox";
import ButtonBorderBlue from "@/components/ButtonBorderBlue";
// type Props = {};
type SelectedMenuItem = {
  quantity: number;
  name: string;
  price: string;
};
export default function RestaurantProfile() {
  const { id } = useParams();
  const {
    data: searchedRestaurant,
    isError,
    isPending,
  } = useGetSearchedRestaurant(id!);
  const [orderCost, setOrderCost] = useState(0.0);
  const [selectedMenuItems, setSelectedMenuItems] = useState<
    SelectedMenuItem[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    mutate: updateCart,
    isPending: cartPending,
    isSuccess: isCartSuccess,
  } = useUpdateCart(
    { restaurantId: searchedRestaurant?._id, details: selectedMenuItems },
    notify
  );
  const { data: checkoutCart, isError: getCartError } = useGetCart();
  const {
    mutate: createNewOrder,
    isPending: newOrderPending,
    isSuccess: isNewOrderSuccess,
  } = useCreateNewOrder(
    { restaurantId: searchedRestaurant?._id, details: selectedMenuItems },
    notify
  );
  const title = "Create a new Order?";
  const description = `Your current order contains items from ${checkoutCart?.restaurantName} (${checkoutCart?.address}).
 Do you want to create a new order to add items from
  ${searchedRestaurant?.name} (${searchedRestaurant?.city}).`;
  console.log(checkoutCart);

  useEffect(() => {
    console.log(selectedMenuItems);
  }, [selectedMenuItems]);

  useEffect(() => {
    if (searchedRestaurant) setOrderCost(searchedRestaurant.deliveryPrice);
  }, [searchedRestaurant]);

  useEffect(() => {
    if (
      ((!cartPending && isCartSuccess) ||
        (!newOrderPending && isNewOrderSuccess)) &&
      searchedRestaurant
    ) {
      setSelectedMenuItems([]);
      setOrderCost(searchedRestaurant.deliveryPrice);
    }
  }, [
    cartPending,
    isCartSuccess,
    searchedRestaurant,
    newOrderPending,
    isNewOrderSuccess,
  ]);
  if (isPending) {
    return (
      <Layout>
        <Suspense fallback={null}>
          <LoadingLottie animationData={animationData} />
        </Suspense>
      </Layout>
    );
  }
  //update with error page
  if (
    !isPending &&
    (isError || getCartError || !searchedRestaurant || !checkoutCart)
  ) {
    return (
      <Layout>
        <div>An error occurred</div>;
      </Layout>
    );
  }
  const addToSelectedMenuItems = (menuItem: {
    name: string;
    price: string;
  }) => {
    setOrderCost((prev) => {
      return prev + parseFloat(menuItem.price!);
    });
    let itemIndex: number = 0;
    const menuItemMatch = selectedMenuItems.find((item, index) => {
      itemIndex = index;
      return item.name === menuItem.name;
    });

    if (menuItemMatch) {
      const tempSelectedMenuArr = [...selectedMenuItems];
      tempSelectedMenuArr[itemIndex] = {
        ...menuItem,
        quantity: menuItemMatch.quantity + 1,
      };

      setSelectedMenuItems([...tempSelectedMenuArr]);
      return;
    }
    setSelectedMenuItems([...selectedMenuItems, { ...menuItem, quantity: 1 }]);
  };
  const deletItem = (itemName: string, itemPrice: string) => {
    const filterMenuItems = selectedMenuItems.filter(
      (item) => item.name !== itemName
    );
    setSelectedMenuItems([...filterMenuItems]);
    setOrderCost((prev) => {
      return prev - parseFloat(itemPrice);
    });
  };
  return (
    <Layout>
      <main className="flex flex-col gap-10">
        <AspectRatio className="" ratio={4.5 / 1}>
          <img
            className="w-full h-full object-cover rounded-lg"
            src={searchedRestaurant?.image}
            alt="Restaurant Image"
          />
        </AspectRatio>
        <section className="flex flex-col lg:flex-row gap-6 justify-center w-full px-4">
          <section className="flex flex-col flex-2 gap-6 max-w-[800px] w-full border2">
            <section className="flex flex-col bg-white rounded-lg px-4 py-6 gap-4 w-full ">
              <section className="flex flex-col">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {searchedRestaurant?.name}
                </h1>
                <span className="text-sm text-black/80">
                  {searchedRestaurant?.city}, {searchedRestaurant?.country}
                </span>
              </section>
              <section>
                <ul className="flex flex-wrap flex-1 w-full gap-1.5 text-black">
                  {searchedRestaurant?.cuisineItems.map((item, index) => {
                    return (
                      <li key={item}>
                        <span className="flex items-center gap-1.5 ">
                          {item}{" "}
                          {index !==
                          searchedRestaurant?.cuisineItems.length - 1 ? (
                            <CircleDashed className=" h-3 w-3" />
                          ) : (
                            ""
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </section>
            <section className="border2 w-full flex flex-col gap-3">
              <h1 className="text-white text-2xl lg:text-3xl font-bold">
                Menu
              </h1>
              <section className="flex flex-col gap-3">
                {searchedRestaurant?.menu.map((item, index) => {
                  return (
                    <button
                      className="flex flex-col bg-white rounded-lg 
                    px-4 py-6 gap-4 w-full hover:bg-white/90 transition-all"
                      key={item.name + index}
                      onClick={() => addToSelectedMenuItems(item)}
                    >
                      <span className="w-fit font-semibold">{item.name}</span>
                      <span className="w-fit font-extrabold">
                        ${item.price}
                      </span>
                    </button>
                  );
                })}
              </section>
            </section>
          </section>
          <section className="flex flex-col max-h-fit lg:max-w-96 bg-white rounded-lg px-4 py-6 gap-6 w-full">
            <section className="flex justify-between">
              <h1 className="text-xl lg:text-2xl font-semibold">Your Order</h1>
              <span className="text-xl lg:text-2xl font-semibold">
                ${orderCost?.toFixed(2)}
              </span>
            </section>
            <Separator className="h-0.5 bg-gray-200" />
            {selectedMenuItems.map((item, index) => {
              return (
                <section
                  key={item.name + index}
                  className="flex justify-between"
                >
                  <section className="ml-2 flex gap-5">
                    <span className=" text-black/90">{item.quantity}</span>
                    <span className=" text-black/90">{item.name}</span>
                  </section>
                  <section className="flex gap-2 items-center justify-center">
                    <button onClick={() => deletItem(item.name, item.price)}>
                      <Trash
                        className="text-red-600 cursor-pointer"
                        size={20}
                      />
                    </button>
                    <span className=" text-black/90">${item.price}</span>
                  </section>
                </section>
              );
            })}
            <Separator className="h-0.5 bg-gray-200" />
            <section className="flex justify-between">
              <span className=" text-black/90">Delivery</span>
              <span className=" text-black/90">
                ${searchedRestaurant?.deliveryPrice.toFixed(2)}
              </span>
            </section>
            <Separator className="h-0.5 bg-gray-200" />
            <ButtonBorderBlue
              isPending={cartPending}
              btnFn={() => {
                if (selectedMenuItems.length < 1) {
                  return;
                }
                if (
                  checkoutCart &&
                  checkoutCart.cart.length > 0 &&
                  searchedRestaurant?._id !== checkoutCart.restaurantId
                ) {
                  setIsOpen(!isOpen);
                  return;
                }
                updateCart();
              }}
            >
              Add To Cart
            </ButtonBorderBlue>
          </section>
        </section>
      </main>
      <section className="absolute z-100 px-4">
        <DialogBox
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title={title}
          description={description}
        >
          <ButtonBorderBlue
            isPending={newOrderPending}
            btnFn={() => {
              createNewOrder();
              setIsOpen(!isOpen);
            }}
          >
            New Order
          </ButtonBorderBlue>
        </DialogBox>
      </section>
    </Layout>
  );
}
