import { FilterRestaurants } from "@/types/resturantTypes";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useRestaurantFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") as FilterRestaurants["search"];
  const sortBy = searchParams.get("sortBy") as FilterRestaurants["sortBy"];
  const cuisineFilter = searchParams.get(
    "cuisineFilter"
  ) as FilterRestaurants["cuisineFilter"];
  const page = searchParams.get("page") as FilterRestaurants["page"];
  const setSearch = useCallback(
    (filters: FilterRestaurants) => {
      setSearchParams(
        (params) => {
          if (filters.search !== undefined) {
            params.set("search", filters.search);
          }
          if (filters.sortBy) {
            params.set("sortBy", filters.sortBy);
          }
          if (filters.page) {
            params.set("page", filters.page);
          }
          if (filters.cuisineFilter || filters.cuisineFilter === "") {
            console.log(filters.cuisineFilter);
            params.set("cuisineFilter", filters.cuisineFilter);
          }
          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );
  return {
    search,
    sortBy,
    cuisineFilter,
    setSearch,
    page,
  };
}
