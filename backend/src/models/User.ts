import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken";

type IUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: number;
};
type IUserMethods = {
  generateJwtToken: (secret: string) => string;
};
//create new User Model type so the shcema can regognize the function
type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
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
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
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

UserSchema.pre("save", async function () {
  console.log("encrypt password");
});

UserSchema.methods.generateJwtToken = function (secret: string) {
  const token = jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    secret,
    { expiresIn: "1h" }
  );
  return token;
};
export const User = mongoose.model<IUser, UserModel>("User", UserSchema);
