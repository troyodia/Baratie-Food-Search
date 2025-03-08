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
//cused to filter restaurants on search results page
export type FilterRestaurants = {
  search?: string;
  sortBy?: "best_match" | "delivery_price" | "estimated_delivery_time";
  cuisineFilter?: string | string[];
  page?: string;
};
