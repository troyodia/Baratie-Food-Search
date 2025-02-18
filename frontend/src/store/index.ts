import { create } from "zustand";
import { authSlice } from "./slices/authSlice";
export interface AuthSlice {
  userToken: string | undefined;
  setUserToken: (userToken: string) => void;
}

export const useAppStore = create<AuthSlice>()((...a) => ({
  ...authSlice(...a),
}));
