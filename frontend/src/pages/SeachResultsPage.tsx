import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Layout from "@/layouts/Layout";
import FilterSearchSection from "@/components/Search Results Page/FilterSearchSection";
import SearchResultsSection from "@/components/Search Results Page/SearchResultsSection";
import useCalculatePageNumbers from "@/hooks/useCalculatePageNumbers";
import { useSearchForRestaurant } from "@/hooks/search";
import { filterCuisines } from "@/utils/filterCusinines";

const SearchSchema = z.object({
  sortBy: z
    .enum(["best_match", "delivery_price", "estimated_delivery_time"])
    .catch("best_match"),
  cuisineFilter: z
    .string()
    .array()
    .transform((valArr, ctx) => {
      const foundArr = filterCuisines(valArr);
      if (foundArr.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
        });
        return z.NEVER;
      }
      return foundArr;
    })
    .catch([]),
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
  // console.log(params.cuisineFilter, numberOfPages);

  const cuisineParamsJson = JSON.stringify(params.cuisineFilter);

  //generate url for cuisine filter array
  const cuisineUrl = params.cuisineFilter
    .map((cuisine) => "&cuisineFilter=" + cuisine)
    .join("");

  //redirect incase of tampering with search params in browser
  useEffect(() => {
    if (params.sortBy && numberOfPages) {
      const cuisineParams: string[] = JSON.parse(cuisineParamsJson);
      naviagte(
        `/results?search=${params.search}&sortBy=${params.sortBy}${
          cuisineParams.length > 0 ? cuisineUrl : ""
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
    params.search,
    params.page,
    numberOfPages,
    cuisineParamsJson,
    cuisineUrl,
  ]);

  return (
    <Layout>
      <div className="text-white  flex flex-col lg:flex-row gap-10 mx-6">
        <FilterSearchSection />
        <SearchResultsSection params={params} />
      </div>
    </Layout>
  );
}
