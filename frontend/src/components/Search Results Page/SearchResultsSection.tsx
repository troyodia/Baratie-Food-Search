import { FilterRestaurants } from "@/types/resturantTypes";
import SearchBar from "../SearchBar";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import SortByDropdown from "./SortByDropdown";
import SearchResults from "./SearchResults";
import { useSearchForRestaurant } from "@/hooks/search";
import RestaurantPagination from "./Pagination";

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
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className=" flex-1 flex flex-col gap-8">
      <SearchBar searchFn={searchFn} />
      <section className="justify-between flex">
        <span className=" font-bold ">
          {searchResults?.resturantCount} Resturaunts found for search term{" "}
          <span className="italic">{search}</span>
        </span>
        <SortByDropdown />
      </section>
      {/*imporve pedning*/}
      {isPending ? (
        <div>...loading</div>
      ) : (
        <section className="w-full flex flex-col gap-10">
          <SearchResults restrauants={searchResults?.restrauants} />
          <RestaurantPagination
            totalRestaurantCount={searchResults?.resturantCount}
          />
        </section>
      )}
    </div>
  );
}
