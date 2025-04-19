//use for get resturant reauest
export type CreatedResturant = {
  _id: string;
  owner: string;
  cuisineItems: string[];
  menu: { name: string; price: string }[];
  name: string;
  city: string;
  country: string;
  deliveryPrice: number;
  deliveryTime: number;
  image: string;
  lastUpdated: Date;
};
//used to filter restaurants on search results page
export type FilterRestaurants = {
  search?: string;
  sortBy?: "best_match" | "delivery_price" | "estimated_delivery_time";
  cuisineFilter?: string | string[];
  page?: string;
};
//for cart
export type Cart = {
  //delivery and name
  _id?: string;
  restaurantId?: string;
  details: { name: string; quantity: number; price: string }[];
};
export type CartItems = {
  _id: string;
  restaurantId: string;
  menuItem: string;
  quantity: number;
  price: string;
};
export type CheckOutCart = {
  restaurantName: string;
  restaurantId: string;
  address: string;
  cart: CartItems;
  subTotal: number;
};
