import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signUpUser, loginUser, getAuthorizedUser } from "@/apis/auth";
import { SignUpandLoginFormDataType } from "@/types/authTypes";
import { useAppStore } from "@/store";
export const useSignUpUser = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (signUpData: SignUpandLoginFormDataType) =>
      signUpUser(signUpData),
    onSuccess: (data) => {
      client.setQueryData(["user"], data);
      onSuccess();
    },
  });
};
export const useLoginUser = (onSuccess: () => void) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (loginData: SignUpandLoginFormDataType) => loginUser(loginData),
    onSuccess: (data) => {
      client.setQueryData(["user"], data);
      onSuccess();
    },
  });
};

export const useGetAuthUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAuthorizedUser,
    initialData: useAppStore.getState().userInfo,
  });
};

export const useRefreshUserOnReload = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: getAuthorizedUser,
    onSuccess: (data) => {
      client.setQueryData(["user"], data);
    },
  });
};
