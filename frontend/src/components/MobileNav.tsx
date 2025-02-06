import { Separator } from "@radix-ui/react-separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SquareMenu } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import baratieIcon from "../assets/Images/Baratie-icon.png";

export function MobileNav() {
  const mobile = useMediaQuery({ maxWidth: 640 });
  return (
    mobile && (
      <div className="flex flex-col gap-2 ">
        <Sheet>
          <SheetTrigger asChild>
            <SquareMenu className=" cursor-pointer" color="#a7c5f5" size={30} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-2xl flex flex-col items-start gap-2">
                <img
                  className="w-20 hover:scale-110 transition-all ease-in-out delay-75 "
                  src={baratieIcon}
                  alt=""
                />
                <span>Baratie!</span>
              </SheetTitle>
            </SheetHeader>
            <Separator className="my-6 h-px bg-black" />
            <SheetDescription className="flex">
              <SheetClose asChild>
                <button className="hover-button py-1 rounded-xl bg-[#97bcf4] font-bold hover:bg-black flex-1">
                  Login
                </button>
              </SheetClose>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    )
  );
}
