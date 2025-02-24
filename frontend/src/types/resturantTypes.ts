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
