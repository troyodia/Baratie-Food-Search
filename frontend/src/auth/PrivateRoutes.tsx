import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "@/store";

export default function PrivateRoutes() {
  const location = useLocation();
  const user = useAppStore(useShallow((state) => state.userToken));

  const isAuthorized = !!user;
  if (!isAuthorized) console.log("is auth", user);
  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login-page" state={{ from: location }} replace />
  );
}
