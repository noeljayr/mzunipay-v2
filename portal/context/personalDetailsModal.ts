import { create } from 'zustand';

interface DepositModalState {
    personalDetailsModalActive: boolean;
    detailsUpdated: boolean;
    setDetailsUpdate: () => void;
    setPersonalDetailsModalActive: () => void;
}


const usePersonalDetailsModalStore = create<DepositModalState>((set) => ({
    personalDetailsModalActive: false,
    detailsUpdated: false,
    setDetailsUpdate: () => set((state) => ({detailsUpdated: !state.detailsUpdated})),
    setPersonalDetailsModalActive: () => set((state) => ({personalDetailsModalActive: !state.personalDetailsModalActive})),
}));

export default usePersonalDetailsModalStore;