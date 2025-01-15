import { create } from "zustand";

interface MobileMenuState {
  menuActive: boolean;
  setMenuActive: () => void;
}

const useMenuStore = create<MobileMenuState>((set) => ({
  menuActive: false,
  setMenuActive: () =>
    set((state) => ({
      menuActive: !state.menuActive,
    })),
}));

export { useMenuStore };
