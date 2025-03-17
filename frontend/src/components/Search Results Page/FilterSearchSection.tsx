import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { items } from "../My Resturant Page/myResturantFormData";
import { ChevronsUpDown, ChevronsDownUp, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import clsx from "clsx";

export default function FilterSearchSection() {
  const { setSearch, cuisineFilter, clearCuisineFilters } =
    useRestaurantFilters();
  const [isOpen, setIsOpen] = useState(false);
  const changeCuisineFn = (item: string) => {
    if (!cuisineFilter?.includes(item)) {
      setSearch({ cuisineFilter: item, page: "1" });
    } else {
      clearCuisineFilters(item);
    }
  };
  return (
    <main className=" flex flex-1 flex-col w-full lg:max-w-[250px] gap-3">
      <section className="flex justify-between mx-2 gap-2 items-center">
        <span className="tracking-tight font-bold text-sm ">
          Filter By Cusisine
        </span>
        <Button
          className=" border-2 bg-transparent  border-[#75AAF0]
             hover:border-[#b6cff7] hover:bg-transparent transition-colors ease-in-out"
          onClick={() => {
            if (cuisineFilter?.length > 0) {
              setSearch({ cuisineFilter: "" });
            }
          }}
        >
          <RotateCcw /> Reset
        </Button>
      </section>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full lg:max-w-[250px] space-y-2"
      >
        {items
          .map((item) => {
            return (
              <button
                aria-label="filter button"
                key={item.id}
                className={clsx(
                  "rounded-md border px-4 py-2 font-mono justify-center lg:justify-normal text-sm shadow-sm flex w-full hover:bg-white hover:text-black",
                  {
                    " border-white shadow-white": !cuisineFilter?.includes(
                      item.id
                    ),
                    " border-[#75AAF0] shadow-[#75AAF0] border-2":
                      cuisineFilter?.includes(item.id),
                  }
                )}
                onClick={() => {
                  changeCuisineFn(item.id);
                }}
              >
                {item.label}
              </button>
            );
          })
          .filter((_, index) => index < 7)}
        <CollapsibleContent className="space-y-2">
          {items
            .map((item) => {
              return (
                <button
                  aria-label="filter button"
                  key={item.id}
                  className={clsx(
                    "rounded-md border px-4 py-2 font-mono text-sm shadow-sm  flex justify-center lg:justify-normal  w-full hover:bg-white hover:text-black",
                    {
                      " border-white shadow-white": !cuisineFilter?.includes(
                        item.id
                      ),
                      " border-[#75AAF0] shadow-[#75AAF0] border-2":
                        cuisineFilter?.includes(item.id),
                    }
                  )}
                  onClick={() => {
                    changeCuisineFn(item.id);
                  }}
                >
                  {item.label}
                </button>
              );
            })
            .filter((_, index) => index >= 7)}
        </CollapsibleContent>
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            {!isOpen ? "More Cusinies" : "Less Cusinies"}
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" aria-label="collapse">
              {!isOpen ? (
                <ChevronsUpDown className="h-4 w-4" />
              ) : (
                <ChevronsDownUp className="h-4 w-4" />
              )}
              {/* <span className="sr-only">Toggle</span> */}
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </main>
  );
}
