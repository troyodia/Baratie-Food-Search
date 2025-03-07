import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { items } from "@/components/My Resturant Page/myResturantFormData";
import Layout from "@/layouts/Layout";
import FilterSearchSection from "@/components/Search Results Page/FilterSearchSection";
import SearchResultsSection from "@/components/Search Results Page/SearchResultsSection";
import useCalculatePageNumbers from "@/hooks/useCalculatePageNumbers";
import { useSearchForRestaurant } from "@/hooks/search";

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
  page: z
    .string()
    .refine((page) => parseInt(page) && parseInt(page) > 0)
    .catch("1"),
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
  const { data: searchResults } = useSearchForRestaurant(params);
  const numberOfPages = useCalculatePageNumbers({
    totalRestaurantCount: searchResults?.resturantCount,
  });

  useEffect(() => {
    if (params.sortBy && numberOfPages) {
      naviagte(
        `/results?search=${params.search}&sortBy=${params.sortBy}${
          params.cuisineFilter !== ""
            ? "&cuisineFilter=" + params.cuisineFilter
            : ""
        }${
          parseInt(params.page) <= numberOfPages
            ? "&page=" + params.page
            : "&page=1"
        }`
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
    numberOfPages,
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
