import { StateCreator } from "zustand";
import { AuthSlice } from "..";

export const authSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (user) => set(() => ({ userInfo: user })),
});
