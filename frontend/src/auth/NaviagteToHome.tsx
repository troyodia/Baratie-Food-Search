import { useGetAuthUser } from "@/hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function NaviagteToHome() {
  const { data: user } = useGetAuthUser();
  const isAuthorized = !!user;
  if (!isAuthorized) console.log("is auth", user);
  return !isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
}
