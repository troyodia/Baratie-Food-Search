import { CreatedResturant, FilterRestaurants } from "@/types/resturantTypes";
import SearchBar from "../SearchBar";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import SortByDropdown from "./SortByDropdown";
import SearchResults from "./SearchResults";
import { useSearchForRestaurant } from "@/hooks/search";

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
    // console.log(search);
    setSearch({
      search: search,
      sortBy: "best_match",
      cuisineFilter: "",
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
          {searchResults?.length} Resturaunts found for search term{" "}
          <span className="italic">{search}</span>
        </span>
        <SortByDropdown />
      </section>
      {/*imporve pedning*/}
      {isPending ? (
        <div>...loading</div>
      ) : (
        <SearchResults searchResults={searchResults} />
      )}
    </div>
  );
}
