import { useMutation } from "@tanstack/react-query";
import { signUpUser, loginUser } from "@/apis/auth";
import { SignUpandLoginFormDataType } from "@/types/authTypes";
export const useSignUpUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (signUpData: SignUpandLoginFormDataType) =>
      signUpUser(signUpData),
    onSuccess: onSuccess,
  });
};
export const useLoginUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (loginData: SignUpandLoginFormDataType) => loginUser(loginData),
    onSuccess: onSuccess,
  });
};
