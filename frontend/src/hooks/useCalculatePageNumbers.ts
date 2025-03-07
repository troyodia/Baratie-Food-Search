import { useMemo } from "react";

type Props = {
  totalRestaurantCount?: number;
};
const NUMBERS_PER_PAGE = 7;

export default function useCalculatePageNumbers({
  totalRestaurantCount,
}: Props) {
  const numberOfPages = useMemo(() => {
    if (totalRestaurantCount)
      return Math.ceil(totalRestaurantCount / NUMBERS_PER_PAGE);
    return 0;
  }, [totalRestaurantCount]);
  return numberOfPages;
}
