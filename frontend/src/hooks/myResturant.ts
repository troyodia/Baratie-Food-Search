import { createMyResturant } from "@/apis/myResturant";
import { useMutation } from "@tanstack/react-query";

export const useCreatMyResturant = () => {
  return useMutation({
    mutationFn: createMyResturant,
    //add toast measage error and success
  });
};
