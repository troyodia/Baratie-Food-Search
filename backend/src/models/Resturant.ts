import mongoose from "mongoose";
type ResturantModel = {
  cuisineItems: string[];
  menu: { name: string; price: number }[];
  name: string;
  city: string;
  country: string;
  deliveryPrice: number;
  deliveryTime: number;
  image: string;
  owner: mongoose.Types.ObjectId;
};
const ResturantScehma = new mongoose.Schema<ResturantModel>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cuisineItems: {
      type: [String],
      required: true,
    },
    menu: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
      },
    ],
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Resturant = mongoose.model<ResturantModel>(
  "Resturant",
  ResturantScehma
);
