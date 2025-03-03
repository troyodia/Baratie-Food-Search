import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import { useState } from "react";
type SortType = {
  name: string;
  queryValue: "best_match" | "delivery_price" | "estimated_delivery_time";
};
const sortOptions: SortType[] = [
  { name: "Best Match", queryValue: "best_match" },
  { name: "Delivery Price", queryValue: "delivery_price" },
  { name: "Estimated Delivery Time", queryValue: "estimated_delivery_time" },
];

export default function SortByDropdown() {
  const { setSearch, sortBy } = useRestaurantFilters();
  const sortOption = () => {
    return sortOptions.find((option) => option.queryValue === sortBy)?.name;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="px-2 py-1 bg-[#97bcf4] text-black font-semibold rounded-md hover:bg-[#c5d8f9] transition-all">
          Sort By: {sortOption()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1">
        {sortOptions.map((option) => {
          return (
            <DropdownMenuItem key={option.queryValue}>
              <button
                className="w-full text-left py-1 px-2 rounded-md hover:bg-blue-100"
                onClick={() => {
                  if (option.queryValue !== sortBy) {
                    setSearch({
                      sortBy: option.queryValue,
                    });
                  }
                }}
              >
                {option.name}
              </button>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
