import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import noSearchResults from "../../assets/Images/nothing-found.webp";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
export default function NoResultsPage() {
  const { search, cuisineFilter } = useRestaurantFilters();
  return (
    <main className="text-center">
      <section className="w-full  mx-auto max-w-[450px] hover:scale-[1.02] transition-transform delay-75 ease-out">
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
        <span className="italic">'{search}'</span>{" "}
        {cuisineFilter ? `with filter '${cuisineFilter}'` : ""}
      </h2>
      <span className=" text-xs lg:text-sm text-[#87b3f2] tracking-tight">
        Try searching for something else instead!
      </span>
    </main>
  );
}
