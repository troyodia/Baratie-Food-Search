import mongoose from "mongoose";

const ResturantScehma = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    lastUpdated: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const Resturant = mongoose.model("Resturant", ResturantScehma);
