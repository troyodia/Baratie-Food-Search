import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetAuthUser } from "@/hooks/auth";

export default function PrivateRoutes() {
  const location = useLocation();
  const { data: user } = useGetAuthUser();
  const isAuthorized = !!user;
  if (!isAuthorized) console.log("is auth", user);
  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login-page" state={{ from: location }} replace />
  );
}
