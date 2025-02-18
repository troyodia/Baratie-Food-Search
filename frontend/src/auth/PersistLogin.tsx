import { useAppStore } from "../store/index";
import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { useShallow } from "zustand/shallow";
import { Outlet } from "react-router-dom";
export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const authInfo = useAppStore(useShallow((state) => state.userToken));

  useEffect(() => {
    const validateRefresh = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!authInfo) validateRefresh();
    else setIsLoading(false);
  }, []);
  return isLoading ? (
    <div className="h-screen bg-black">..Loading</div>
  ) : (
    <Outlet />
  );
}
