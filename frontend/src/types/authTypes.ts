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
