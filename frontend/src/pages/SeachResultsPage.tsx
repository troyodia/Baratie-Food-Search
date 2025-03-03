import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { items } from "@/components/My Resturant Page/myResturantFormData";
import Layout from "@/layouts/Layout";
import FilterSearchSection from "@/components/Search Results Page/FilterSearchSection";
import SearchResultsSection from "@/components/Search Results Page/SearchResultsSection";

const SearchSchema = z.object({
  sortBy: z
    .enum(["best_match", "delivery_price", "estimated_delivery_time"])
    .catch("best_match"),
  cuisineFilter: z
    .string()
    .refine((val) => {
      const found = items.find((item) => val === item.label || val === item.id);
      return !!found;
    })
    .catch(""),
  search: z.string().catch(""),
  page: z.string().catch("1"),
});
export default function SeachResultsPage() {
  const naviagte = useNavigate();
  const { search, sortBy, cuisineFilter, page } = useRestaurantFilters();
  const params = SearchSchema.parse({
    sortBy: sortBy,
    cuisineFilter: cuisineFilter,
    search: search,
    page: page,
  });
  // console.log("params", params);
  //add error, ipending stuff, data existing else render error page, put is pedning in search results section
  useEffect(() => {
    if (params.sortBy) {
      naviagte(
        `/results?search=${params.search}&sortBy=${params.sortBy}${
          params.cuisineFilter !== ""
            ? "&cuisineFilter=" + params.cuisineFilter
            : ""
        }&page=${params.page}`
        // { replace: true }
      );
    }
  }, [
    search,
    naviagte,
    params.sortBy,
    params.cuisineFilter,
    params.search,
    params.page,
  ]);

  return (
    <Layout>
      <div className="text-white border flex gap-10">
        <FilterSearchSection />
        <SearchResultsSection params={params} />
      </div>
    </Layout>
  );
}
