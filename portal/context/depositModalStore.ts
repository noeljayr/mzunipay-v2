import { create } from 'zustand';

interface DepositModalState {
    depositModalActive: boolean;
    setDepositModalActive: () => void;
}


const useDepositModalStore = create<DepositModalState>((set) => ({
    depositModalActive: false,
    setDepositModalActive: () => set((state) => ({depositModalActive: !state.depositModalActive})),
}));

export default useDepositModalStore;