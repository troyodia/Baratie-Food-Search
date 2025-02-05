import { Button } from "@/components/ui/button";
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
                <img className=" w-20" src={baratieIcon} alt="" />
                <span>Baratie!</span>
              </SheetTitle>
            </SheetHeader>
            <Separator className="my-6 h-px bg-black" />
            <SheetDescription className="flex">
              <SheetClose asChild>
                <Button className=" bg-[#97bcf4] text-black font-bold hover:bg-[#75aaf0]/50 flex-1">
                  Login
                </Button>
              </SheetClose>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    )
  );
}
