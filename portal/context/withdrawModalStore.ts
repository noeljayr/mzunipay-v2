import { create } from 'zustand';

interface DepositModalState {
    withdrawModalActive: boolean;
    setWithdrawModalActive: () => void;
}


const useWidthdrawModalStore = create<DepositModalState>((set) => ({
    withdrawModalActive: false,
    setWithdrawModalActive: () => set((state) => ({withdrawModalActive: !state.withdrawModalActive})),
}));

export default useWidthdrawModalStore;