import { useState } from "react";
import { Search } from "lucide-react";

import { createSearchParams, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchParam, setSearchParam] = useState("");
  const naviagte = useNavigate();

  return (
    <div className="flex w-full gap-2 max-w-[85%] sm:max-w-[70%]  text-white">
      <input
        placeholder="Search for a City or Town"
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
            naviagte({
              pathname: "results",
              search: createSearchParams({
                search: searchParam,
                sortBy: "best_match",
              }).toString(),
            });
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
