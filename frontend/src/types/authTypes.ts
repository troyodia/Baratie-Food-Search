export type LoginUserInfo = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: number;
  __v?: number;
};
export type SignUpFormDataType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type SignedUpUser = {
  firstname: string;
  lastname: string;
  email: string;
};
