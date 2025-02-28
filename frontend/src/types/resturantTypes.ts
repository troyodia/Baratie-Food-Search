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
//craete queries for sort by, set sort by default value
export type FilterRestaurants = {
  search?: string;
  sortBy?: "best_match" | "delivery_price" | "estimated_delivery_time";
  cuisineFilter?: string;
};
