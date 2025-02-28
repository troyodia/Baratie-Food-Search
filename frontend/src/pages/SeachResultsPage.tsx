import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { items } from "@/components/My Resturant Page/myResturantFormData";
import { useSearchForRestaurant } from "@/hooks/search";

const SearchSchema = z.object({
  sortBy: z
    .enum(["best_match", "delivery_price", "estimated_delivery_time"])
    .catch("best_match"),
  cuisineFilter: z
    .string()
    .refine((val) => {
      const found = items.find((item) => val === item.label || val === item.id);
      console.log(found);
      return !!found;
    })
    .catch(""),
  search: z.string().catch(""),
});
export default function SeachResultsPage() {
  //set initail value for sortBy and use it for ascending order in back end
  //   const [search, setSearch] = useSearchParams();
  const naviagte = useNavigate();
  const { search, sortBy, cuisineFilter, setSearch } = useRestaurantFilters();
  //   console.log(search, sortBy);
  const params = SearchSchema.parse({
    sortBy: sortBy,
    cuisineFilter: cuisineFilter,
    search: search,
  });
  const { data, error, isPending, isError } = useSearchForRestaurant(params);
  useEffect(() => {
    if (params.sortBy) {
      naviagte(
        `/results?search=${params.search}&sortBy=${params.sortBy}${
          params.cuisineFilter !== ""
            ? "&cuisineFilter=" + params.cuisineFilter
            : ""
        }`,
        { replace: true }
      );
    }
  }, [search, naviagte, params.sortBy, params.cuisineFilter, params.search]);
  //   console.log(params);
  return <div>SeachResultsPage</div>;
  //craete layout
}
