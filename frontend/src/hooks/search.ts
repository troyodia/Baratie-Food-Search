import { searchForRestaurant } from "@/apis/search";
import { FilterRestaurants } from "@/types/resturantTypes";
import { useQuery } from "@tanstack/react-query";

export const useSearchForRestaurant = ({
  search,
  cuisineFilter,
  sortBy,
  page,
}: FilterRestaurants) => {
  return useQuery({
    queryKey: ["restaurant-search", { search, cuisineFilter, sortBy, page }],
    queryFn: () => searchForRestaurant({ search, cuisineFilter, sortBy, page }),
  });
};
