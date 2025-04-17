import { useLogoutUser } from "@/hooks/auth";
import { ShoppingCart } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

type NavLinksProps = {
  name: string;
  path: string;
  id: string;
};
const NavLinks: NavLinksProps[] = [
  {
    name: "Order Status",
    path: "/order-status",
    id: uuidv4(),
  },
  {
    name: "Profile",
    path: "/user-profile",
    id: uuidv4(),
  },
  {
    name: "My Resturant",
    path: "/my-resturant",
    id: uuidv4(),
  },
];

export default function UserNaviagtion() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutUser(() => navigate("/login-page"));
  return (
    <nav className="hidden lg:flex space-x-8 items-center">
      <div className="flex items-center space-x-6 px-8 rounded-full font-medium text-lg tracking-tight bg-[#eff7ff1f] ">
        {NavLinks.map((link) => {
          return (
            <div
              key={link.id}
              className=" hover:backdrop-blur-lg hover:bg-white/25 text-transparent overflow-hidden leading-8 [text-shadow:0_0_#FFFF,0_2rem_#FFFF]
                 hover:[text-shadow:0_-2rem_#FFFF,0_0_#FFFF] transition-all duration-500 delay-75 m-0 py-1 "
            >
              <NavLink
                to={link.path}
                className={({ isActive }) => {
                  return isActive ? " py-2 px-3 bg-white/35" : " py-2 px-3";
                }}
              >
                <span>{link.name}</span>
              </NavLink>
            </div>
          );
        })}
      </div>
      <button>
        <ShoppingCart className="hover:text-[#75AAF0] text-white transition-all" />
      </button>
      <button
        className="group hover-button text-sm font-bold py-2.5 px-6 border-2 border-[#75AAF0] hover:border-[#FFFF] rounded-md"
        onClick={() => logout()}
      >
        <span
          className="relative before:absolute before:top-[100%] before:left-0 before:right-0 before:mx-auto before:my-0 before:h-4/5 before:w-3/4
        before:bg-white before:opacity-0 before:[transform:perspective(10px)_rotateX(10deg)_scale(0.92,0.48)] before:blur-[0.9em] group-hover:before:opacity-100 "
        >
          Logout
        </span>
      </button>
    </nav>
  );
}
