import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken";
import { hash, compare, genSalt } from "bcryptjs";
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
  generateJwtToken: (secret: string, timeOut: string) => string;
  comparePassword: (password: string) => Promise<boolean>;
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
  const salt = await genSalt();
  const encryptedPassword = await hash(this.password, salt);
  this.password = encryptedPassword;
});
UserSchema.methods.comparePassword = async function (password: string) {
  const isMatch = await compare(password, this.password);
  return isMatch;
};
UserSchema.methods.generateJwtToken = function (
  secret: string,
  timeOut: string
) {
  const token = jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    secret,
    { expiresIn: timeOut === "1h" ? "1h" : "30d" }
  );
  return token;
};
export const User = mongoose.model<IUser, UserModel>("User", UserSchema);
