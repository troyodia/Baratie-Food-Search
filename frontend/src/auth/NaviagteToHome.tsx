import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../store/index";
import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { useShallow } from "zustand/shallow";

export default function NaviagteToHome() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const authInfo = useAppStore(useShallow((state) => state.userToken));

  useEffect(() => {
    const validateRefresh = async () => {
      try {
        await refresh();
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!authInfo) validateRefresh();
  }, []);

  return isLoading ? <Outlet /> : <Navigate to="/" replace />;
}
