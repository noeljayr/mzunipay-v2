import { create } from 'zustand';

interface AvatarModalState {
    avatarModalActive: boolean;
    setAvatarModalActive: () => void;
}


const useAvatarModalStore = create<AvatarModalState>((set) => ({
    avatarModalActive: true,
    setAvatarModalActive: () => set((state) => ({avatarModalActive: !state.avatarModalActive})),
}));

export default useAvatarModalStore;