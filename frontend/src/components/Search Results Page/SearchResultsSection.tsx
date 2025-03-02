import { CreatedResturant } from "@/types/resturantTypes";
import SearchBar from "../SearchBar";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import SortByDropdown from "./SortByDropdown";

type Props = {
  searchResults: CreatedResturant[];
};

export default function SearchResultsSection({ searchResults }: Props) {
  const { search } = useRestaurantFilters();

  return (
    <div className=" flex-1 flex flex-col gap-8">
      <SearchBar />
      <section className="justify-between flex">
        <span className=" font-bold ">
          {searchResults?.length} Resturaunts found for search term{" "}
          <span className="italic">{search}</span>
        </span>
        <SortByDropdown />
      </section>
    </div>
  );
}
