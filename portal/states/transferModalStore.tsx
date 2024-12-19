import { create } from 'zustand';

interface DepositModalState {
    transferModalActive: boolean;
    setTransferModalActive: () => void;
}


const useTransferModalStore = create<DepositModalState>((set) => ({
    transferModalActive: false,
    setTransferModalActive: () => set((state) => ({transferModalActive: !state.transferModalActive})),
}));

export default useTransferModalStore;