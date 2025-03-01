import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { items } from "@/components/My Resturant Page/myResturantFormData";
import { useSearchForRestaurant } from "@/hooks/search";
import Layout from "@/layouts/Layout";
import FilterSearchSection from "@/components/Search Results Page/FilterSearchSection";

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
  const naviagte = useNavigate();
  const { search, sortBy, cuisineFilter } = useRestaurantFilters();
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
  return (
    <Layout>
      <div className="text-white border ">
        <FilterSearchSection />
      </div>
    </Layout>
  );
}
