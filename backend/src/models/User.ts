import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trime: true,
    },
    password: {
      type: String,
      reqired: true,
      trim: true,
    },
    Address: {
      type: String,
      required: false,
    },
    City: {
      type: String,
      required: false,
    },
    Country: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
