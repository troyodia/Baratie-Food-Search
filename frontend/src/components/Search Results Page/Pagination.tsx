import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import clsx from "clsx";
import { useMemo } from "react";

type Props = {
  totalRestaurantCount?: number;
};
const NUMBERS_PER_PAGE = 3;

export default function RestaurantPagination({ totalRestaurantCount }: Props) {
  const { setSearch, page } = useRestaurantFilters();
  const numberOfPages = useMemo(() => {
    if (totalRestaurantCount)
      return Math.ceil(totalRestaurantCount / NUMBERS_PER_PAGE);
  }, [totalRestaurantCount]);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={clsx(
              "cursor-pointer  hover:bg-[#97bcf4] font-semibold",
              {
                "hover:bg-transparent hover:text-slate-500 text-slate-500":
                  page && parseInt(page) <= 1,
              }
            )}
            onClick={() => {
              if (page && parseInt(page) > 1) {
                setSearch({
                  page: (parseInt(page) - 1).toString(),
                });
              }
            }}
          />
        </PaginationItem>
        {page &&
          numberOfPages &&
          [...new Array(numberOfPages)]
            .map((_, index) => {
              const pageNum = index + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    className={clsx(
                      "cursor-pointer transition-all delay-150 hover:bg-[#97bcf4]",
                      {
                        "hover:bg-[#97bcf4] bg-[#97bcf4] hover:text-black text-black":
                          pageNum.toString() === page,
                      }
                    )}
                    onClick={() => {
                      if (page) {
                        setSearch({
                          page: pageNum.toString(),
                        });
                      }
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })
            .filter((_, index) => {
              const currentPage = index + 1;
              return (
                currentPage < parseInt(page) + 2 &&
                currentPage > parseInt(page) - 2
              );
            })}

        <PaginationItem>
          <PaginationNext
            className={clsx("cursor-pointer hover:bg-[#97bcf4] font-semibold", {
              "hover:bg-transparent hover:text-slate-500 text-slate-500":
                page && numberOfPages && parseInt(page) >= numberOfPages,
            })}
            onClick={() => {
              if (page && numberOfPages && parseInt(page) < numberOfPages) {
                setSearch({
                  page: (parseInt(page) + 1).toString(),
                });
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
