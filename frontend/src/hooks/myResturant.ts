import { createMyResturant } from "@/apis/myResturant";
import { useMutation } from "@tanstack/react-query";

export const useCreatMyResturant = () => {
  return useMutation({
    mutationFn: createMyResturant,
    onError: (error) => {
      console.log(error.message);
    },
    //add toast measage error and success
  });
};
