import { useState } from "react";
import { Search } from "lucide-react";

import { createSearchParams, useNavigate } from "react-router-dom";
type Props = {
  searchFn?: (search: string) => void;
};
export default function SearchBar({ searchFn }: Props) {
  const [searchParam, setSearchParam] = useState("");
  const naviagte = useNavigate();
  // max-w-[85%] sm:max-w-[70%]
  const homePageSearchFn = () => {
    naviagte(
      {
        pathname: "results",
        search: createSearchParams({
          search: searchParam,
          sortBy: "best_match",
          page: "1",
        }).toString(),
      },
      { replace: true }
    );
  };
  return (
    <div className="flex w-full gap-3 text-white">
      <input
        placeholder="Search by a City, Resturant Name or Cusinie"
        className="placeholder-[#c5d8f9] py-2  bg-[#474a4f] border-transparent outline-1 
        outline-offset-2 focus:outline-dashed px-6 focus:border-none flex flex-1 min-w-0"
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
      />
      <button
        className=" group rounded-full w-10 shrink-0 flex items-center justify-center 
      border-2 bg-transparent text-black border-[#75AAF0] hover:border-[#b6cff7] 
      hover:bg-transparent transition-colors ease-in-out"
        onClick={() => {
          if (searchParam) {
            if (searchFn) {
              searchFn(searchParam);
            } else {
              homePageSearchFn();
            }
          }
        }}
      >
        <Search
          className="text-[#75AAF0] group-hover:text-[#b6cff7]"
          size="18"
        />
      </button>
      {/* <Button>Reset</Button> */}
    </div>
  );
}
