import { useGetAuthUser } from "@/hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import UserNaviagtion from "./UserNaviagtion";

export default function DesktopNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: user } = useGetAuthUser();
  return (
    <>
      {(user === undefined || pathname === "/welcome") && (
        <div className="hidden lg:flex ">
          <button
            className="group hover-button text-sm font-bold py-2.5 px-6 border-2 border-[#75AAF0] hover:border-[#FFFF] rounded-md"
            onClick={() => navigate("/login-page")}
          >
            <span
              className="relative before:absolute before:top-[100%] before:left-0 before:right-0 before:mx-auto before:my-0 before:h-4/5 before:w-3/4
        before:bg-white before:opacity-0 before:[transform:perspective(10px)_rotateX(10deg)_scale(0.92,0.48)] before:blur-[0.9em] group-hover:before:opacity-100 "
            >
              Login
            </span>
          </button>
        </div>
      )}

      {pathname !== "/welcome" && user !== undefined && <UserNaviagtion />}
    </>
  );
}
