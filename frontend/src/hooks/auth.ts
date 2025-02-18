import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signUpUser, loginUser, getAuthorizedUser, logout } from "@/apis/auth";
import { SignUpandLoginFormDataType } from "@/types/authTypes";
import { useAppStore } from "@/store";
export const setIntialUser = (token: string) => {
  useAppStore.setState({
    userToken: token,
  });
};
export const useSignUpUser = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (signUpData: SignUpandLoginFormDataType) =>
      signUpUser(signUpData),
    onSuccess: (data) => {
      client.setQueryData(["user"], data);
      if (data) setIntialUser(data.token);
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
      if (data) setIntialUser(data.token);

      onSuccess();
    },
  });
};

export const useGetAuthUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAuthorizedUser,
  });
};

export const useLogoutUser = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      client.setQueryData(["user"], null);
      onSuccess();
    },
  });
};
