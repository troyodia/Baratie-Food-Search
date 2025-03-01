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

  const setSearch = useCallback((filters: FilterRestaurants) => {
    setSearchParams(
      (params) => {
        if (filters.search !== undefined) {
          params.set("search", filters.search);
        }
        if (filters.sortBy) {
          params.set("sortBy", filters.sortBy);
        }
        if (filters.cuisineFilter || filters.cuisineFilter === "") {
          params.set("cuisineFilter", filters.cuisineFilter);
        }
        return params;
      },
      { replace: true }
    );
  }, []);
  return {
    search,
    sortBy,
    cuisineFilter,
    setSearch,
  };
}
