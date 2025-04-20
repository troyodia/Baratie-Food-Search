import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  isPending?: boolean;
  btnFn: () => void;
  children: ReactNode;
};

export default function ButtonBorderBlue({
  isPending,
  btnFn,
  children,
}: Props) {
  return (
    <button
      disabled={isPending}
      className="w-full py-2 border-2 border-[#75AAF0] hover:border-black rounded-md 
            transition-all ease-in-out delay-150 hover:text-[#75AAF0] text-lg font-bold flex gap-1.5 items-center justify-center"
      onClick={btnFn}
    >
      {isPending && <LoaderCircle className="animate-spin h-4 w-4" />}
      {children}
    </button>
  );
}
