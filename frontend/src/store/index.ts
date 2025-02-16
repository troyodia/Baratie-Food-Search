import { create } from "zustand";
import { AuthorizedUser } from "@/types/authTypes";
import { authSlice } from "./slices/authSlice";
export interface AuthSlice {
  userInfo: AuthorizedUser | undefined;
  setUserInfo: (user: AuthorizedUser) => void;
}

export const useAppStore = create<AuthSlice>()((...a) => ({
  ...authSlice(...a),
}));
