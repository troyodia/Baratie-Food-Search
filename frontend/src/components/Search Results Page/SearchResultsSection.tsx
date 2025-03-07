import { FilterRestaurants } from "@/types/resturantTypes";
import SearchBar from "../SearchBar";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import SortByDropdown from "./SortByDropdown";
import SearchResults from "./SearchResults";
import { useSearchForRestaurant } from "@/hooks/search";
import RestaurantPagination from "./Pagination";
import { lazy, Suspense } from "react";
import animationData from "../../assets/lottie/food_search_pending.json";
import NoResultsPage from "./NoResultsIPage.tsx";

const LoadingLottie = lazy(() => import("../Lotties/LoadingLottie.tsx"));
type Props = {
  //   searchResults: CreatedResturant[];
  params: FilterRestaurants;
};

export default function SearchResultsSection({ params }: Props) {
  const { search, setSearch } = useRestaurantFilters();
  //   console.log(search);
  const {
    data: searchResults,
    isPending,
    isError,
  } = useSearchForRestaurant(params);

  //improve error message, handle error in main page and ahndle empty search results
  // with lottie in middle of page

  const searchFn = (search: string) => {
    setSearch({
      search: search,
      sortBy: "best_match",
      cuisineFilter: "",
      page: "1",
    });
  };
  console.log(searchResults);
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className=" flex-1 flex flex-col gap-8">
      <SearchBar searchFn={searchFn} />
      <section className="flex">
        {searchResults && searchResults.resturantCount !== 0 && (
          <span className=" font-bold ">
            {searchResults?.resturantCount} Resturaunts found for search term{" "}
            <span className="italic">{search}</span>
          </span>
        )}
        <SortByDropdown />
      </section>
      {isPending ? (
        // <div>...loading</div>
        <Suspense fallback={null}>
          <LoadingLottie animationData={animationData} />
        </Suspense>
      ) : (
        searchResults &&
        searchResults.restrauants.length !== 0 && (
          <section className="w-full flex flex-col gap-10">
            <SearchResults restrauants={searchResults?.restrauants} />
            <RestaurantPagination
              totalRestaurantCount={searchResults?.resturantCount}
            />
          </section>
        )
      )}
      {searchResults && searchResults.restrauants.length === 0 && (
        <NoResultsPage />
      )}
    </div>
  );
}
