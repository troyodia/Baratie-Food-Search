import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useCalculatePageNumbers from "@/hooks/useCalculatePageNumbers";
import useRestaurantFilters from "@/hooks/useRestaurantFilters";
import clsx from "clsx";

type Props = {
  totalRestaurantCount?: number;
  scrollFn: () => void;
};

export default function RestaurantPagination({
  totalRestaurantCount,
  scrollFn,
}: Props) {
  const { setSearch, page } = useRestaurantFilters();
  const numberOfPages = useCalculatePageNumbers({ totalRestaurantCount });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem aria-label="previous">
          <PaginationPrevious
            data-testid="previous-button"
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
                scrollFn();
              }
            }}
          />
        </PaginationItem>
        {page &&
          !!numberOfPages &&
          [...new Array(numberOfPages)]
            .map((_, index) => {
              const pageNum = index + 1;
              return (
                <PaginationItem key={pageNum} aria-label="pagination">
                  <PaginationLink
                    data-testid="page-number"
                    className={clsx(
                      "cursor-pointer transition-all delay-150 hover:bg-[#97bcf4]",
                      {
                        "hover:bg-[#97bcf4] bg-[#97bcf4] hover:text-black text-black":
                          pageNum.toString() === page,
                      }
                    )}
                    onClick={() => {
                      if (page && pageNum.toString() !== page) {
                        setSearch({
                          page: pageNum.toString(),
                        });
                        scrollFn();
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

        <PaginationItem aria-label="next">
          <PaginationNext
            data-testid="next-button"
            className={clsx("cursor-pointer hover:bg-[#97bcf4] font-semibold", {
              "hover:bg-transparent hover:text-slate-500 text-slate-500":
                (page && numberOfPages && parseInt(page) >= numberOfPages) ||
                numberOfPages === 0,
            })}
            onClick={() => {
              if (page && numberOfPages && parseInt(page) < numberOfPages) {
                setSearch({
                  page: (parseInt(page) + 1).toString(),
                });
                scrollFn();
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
