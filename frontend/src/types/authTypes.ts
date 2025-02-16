export type SignUpandLoginFormDataType = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
};
export type ValidatedUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
};
export type AuthorizedUser = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: number;
  token: string;
};
