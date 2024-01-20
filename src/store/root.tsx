import { create } from "zustand";

type RootStore = {
  isLoggedIn: boolean;
  userRole: "landlord" | "renter" | null;
  login: () => void;
  logout: () => void;
  setLandlord: () => void;
  setRenter: () => void;
};

const useRootStore = create<RootStore>((set) => ({
  isLoggedIn: false,
  userRole: null,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  setLandlord: () => set({ userRole: "landlord" }),
  setRenter: () => set({ userRole: "renter" }),
}));

export default useRootStore;
