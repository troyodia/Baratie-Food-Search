import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import noSearchResults from "../../assets/Images/nothing-found.webp";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { filterCuisines } from "@/utils/filterCusinines";
export default function NoResultsPage() {
  const { search, cuisineFilter } = useRestaurantFilters();
  const filteredCuisines = filterCuisines(cuisineFilter);
  return (
    <main className="text-center">
      <section
        data-testid="no-results-found"
        className="w-full  mx-auto max-w-[450px] hover:scale-[1.02] transition-transform delay-75 ease-out"
      >
        <AspectRatio ratio={16 / 9} className="">
          <img
            alt=""
            src={noSearchResults}
            className="w-full h-full object-cover rounded-lg"
          ></img>
        </AspectRatio>
      </section>
      <h2 className=" lg:text-lg">
        We didn't find any results for{" "}
        <span className="italic font-semibold">'{search}'</span>{" "}
        {filteredCuisines.length > 0 && (
          <span>
            with filter(s){" "}
            <span className="italic font-semibold">
              '
              {filteredCuisines.length >= 2
                ? filteredCuisines.join()
                : filteredCuisines[0]}
              '
            </span>{" "}
          </span>
        )}
        {/* {cuisineFilter ? `with filter(s) '${cuisineFilter.join(",")}'` : ""} */}
      </h2>
      <span className=" text-xs lg:text-sm text-[#87b3f2] tracking-tight">
        Try searching for something else instead!
      </span>
    </main>
  );
}
