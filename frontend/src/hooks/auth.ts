import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/apis/auth";
import { SignUpFormDataType } from "@/types/authTypes";
export const useSignUpUser = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (signUpData: SignUpFormDataType) => signUpUser(signUpData),
    onSuccess: onSuccess,
  });
};
