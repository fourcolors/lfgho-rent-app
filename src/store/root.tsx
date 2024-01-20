import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RootStore = {
  isLoggedIn: boolean;
  userRole: "landlord" | "renter" | null;
  login: () => void;
  logout: () => void;
  setUserRole: (role: "landlord" | "renter") => void;
};

const useRootStore = create<RootStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userRole: null,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      setUserRole: (role) => set({ userRole: role }),
    }),
    {
      name: "root",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRootStore;
