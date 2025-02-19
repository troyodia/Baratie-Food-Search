import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  signUpUser,
  loginUser,
  getAuthorizedUser,
  logout,
  updateUserProfile,
} from "@/apis/auth";
import { SignUpandLoginFormDataType } from "@/types/authTypes";
import { useAppStore } from "@/store";
import { ProfileFormType } from "@/components/Profile Page/Profile";
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
      if (data) {
        client.setQueryData(["user"], data?.user);
        setIntialUser(data.token);
        onSuccess();
      }
    },
  });
};
export const useLoginUser = (onSuccess: () => void) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (loginData: SignUpandLoginFormDataType) => loginUser(loginData),
    onSuccess: (data) => {
      console.log(data);
      if (data) {
        client.setQueryData(["user"], data?.user);

        setIntialUser(data.token);
        onSuccess();
      }
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
    onSuccess: (data) => {
      if (data) {
        client.setQueryData(["user"], null);

        setIntialUser("");
        onSuccess();
      }
    },
  });
};

export const useUpdateProfie = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (formData: ProfileFormType) => updateUserProfile(formData),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({ queryKey: ["user"] });
    },
  });

  //inavlidate
};
