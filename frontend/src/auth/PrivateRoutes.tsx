import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "@/store";

export default function PrivateRoutes() {
  const user = useAppStore(useShallow((state) => state.userToken));

  const isAuthorized = !!user;
  return isAuthorized ? <Outlet /> : <Navigate to="/login-page" replace />;
}
