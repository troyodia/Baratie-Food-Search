import { items } from "@/components/My Resturant Page/myResturantFormData";

export const filterCuisines = (valArr: string[]): string[] => {
  const foundArr: string[] = valArr.filter((val: string) =>
    items.find((item) => val === item.label || val === item.id)
  );
  return foundArr;
};
