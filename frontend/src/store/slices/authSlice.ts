import { StateCreator } from "zustand";
import { AuthSlice } from "..";

export const authSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  userToken: undefined,
  setUserToken: (userToken) => set(() => ({ userToken: userToken })),
});
