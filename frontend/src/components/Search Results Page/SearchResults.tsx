import { CreatedResturant } from "@/types/resturantTypes";
import { Link } from "react-router-dom";
import { AspectRatio } from "../ui/aspect-ratio";
import { CircleDashed, Clock, CircleDollarSign } from "lucide-react";
import { useMediaQuery } from "react-responsive";
type SearchResults = {
  restrauants?: CreatedResturant[];
};

export default function SearchResults({ restrauants }: SearchResults) {
  const lg = useMediaQuery({ minWidth: 1024 });
  //loading lottie?
  return (
    <main className="flex flex-col gap-10">
      {restrauants?.map((result) => {
        return (
          <Link
            key={result._id}
            to={`/${result.name.toLowerCase().replace(" ", "-")}/${result._id}`}
            className="group"
            aria-label="restuarant link"
          >
            <div className="  lg:grid flex flex-col grid-cols-3 gap-4 w-full">
              <section className="w-full  lg:max-w-[450px] group-hover:scale-[1.02] transition-transform delay-75 ease-out">
                <AspectRatio ratio={!lg ? 2.35 / 1 : 16 / 9} className="">
                  <img
                    alt=""
                    src={result.image}
                    className="w-full h-full object-cover rounded-lg"
                  ></img>
                </AspectRatio>
              </section>
              <section className=" flex flex-col gap-2 w-full  lg:col-span-2">
                <h2 className="group-hover:underline underline-offset-4 font-bold tracking-tight text-2xl">
                  {result.name}
                </h2>
                <section className="flex lg:flex-row flex-col gap-3 lg:gap-6  w-full  ">
                  <ul className="flex flex-wrap flex-1 w-full max-w-96 gap-1.5 text-white/90">
                    {result.cuisineItems.map((item, index) => {
                      return (
                        <li key={item}>
                          <span className="flex items-center gap-1.5 ">
                            {item}{" "}
                            {index !== result.cuisineItems.length - 1 ? (
                              <CircleDashed className=" h-3 w-3" />
                            ) : (
                              ""
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <section className="space-y-3 flex-1 ">
                    <span className="text-[#75aaf0] flex gap-1.5">
                      <Clock /> {result.deliveryTime.toString()} mins
                    </span>
                    <span
                      className="flex  text-white/90 gap-1.5"
                      data-testid="delivery-price"
                    >
                      <CircleDollarSign /> Delivery From $
                      {result.deliveryPrice.toString()}
                    </span>
                  </section>
                </section>
              </section>
            </div>
          </Link>
        );
      })}
    </main>
  );
}
