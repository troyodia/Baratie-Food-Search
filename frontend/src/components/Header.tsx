import { NavLink } from "react-router-dom";
import { MobileNav } from "./MobileNav";
import DesktopNav from "./DesktopNav";
export default function Header() {
  return (
    <nav className="w-full h-20">
      <div className=" h-full container mx-auto flex justify-between items-center px-8">
        <NavLink
          to="/"
          className="text-4xl sm:text-5xl font-bold tracking-tight text-white "
        >
          Baratie
        </NavLink>
        <DesktopNav />
        <MobileNav />
      </div>
    </nav>
  );
}
