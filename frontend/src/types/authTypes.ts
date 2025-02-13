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
export type SignUpandLoginFormDataType = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
};
export type ValidatedUser = {
  firstname: string;
  lastname: string;
  email: string;
};
