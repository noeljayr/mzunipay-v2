import { create } from "zustand";

interface AvatarModalState {
  avatarModalActive: boolean;
  setAvatarModalActive: () => void;
}

const useAvatarModalStore = create<AvatarModalState>((set) => ({
  avatarModalActive: false,
  setAvatarModalActive: () =>
    set((state) => ({ avatarModalActive: !state.avatarModalActive })),
}));

export default useAvatarModalStore;
