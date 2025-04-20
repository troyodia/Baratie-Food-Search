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
import { ShoppingCart, SquareMenu } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import baratieIcon from "../assets/Images/Baratie-icon.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGetAuthUser, useLogoutUser } from "@/hooks/auth";
import clsx from "clsx";
import CartButton from "./CartButton";

export function MobileNav() {
  const mobile = useMediaQuery({ maxWidth: 1024 });
  const { data: user } = useGetAuthUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: logout } = useLogoutUser(() => navigate("/login-page"));
  return (
    mobile && (
      <div className="flex flex-col gap-2 font-mono ">
        <Sheet>
          <SheetTrigger asChild>
            <SquareMenu className=" cursor-pointer" color="#a7c5f5" size={30} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-2xl flex flex-col items-start gap-2 font-mono">
                <img
                  className="w-20 hover:scale-110 transition-all ease-in-out delay-75 "
                  src={baratieIcon}
                  alt=""
                />
                <span>Baratie!</span>
              </SheetTitle>
            </SheetHeader>
            <Separator
              className={clsx("mt-6 h-px bg-black", {
                "mb-16": user && pathname !== "/welcome",
                "mb-6": user === undefined || pathname === "/welcome",
              })}
            />
            {user && pathname !== "/welcome" && (
              <nav className="flex flex-col gap-10 mb-10 text-lg font-bold items-center justify-center font-mono">
                <NavLink to="">Order Status</NavLink>
                <NavLink to="/user-profile">Profile</NavLink>
                <NavLink to="/my-resturant">My Resturant</NavLink>
                <CartButton />
              </nav>
            )}
            <SheetDescription className="flex justify-center">
              <SheetClose asChild>
                <button
                  className="font-mono group hover-button py-2 rounded-full font-bold bg-black flex-1 max-w-[250px]"
                  onClick={async () => {
                    if (user && pathname !== "/welcome") {
                      logout();
                    } else {
                      navigate("/login-page");
                    }
                  }}
                >
                  <span
                    className="relative px-12 py before:absolute before:top-[100%] before:left-0 before:right-0 before:mx-auto before:my-0 before:h-4/5 before:w-3/4
        before:bg-white before:opacity-0 before:[transform:perspective(4px)_rotateX(10deg)_scale(0.85,0.8)] before:blur-[0.98em] group-hover:before:opacity-90 "
                  >
                    {user && pathname !== "/welcome" ? "Logout" : "Login"}
                  </span>
                </button>
              </SheetClose>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    )
  );
}
