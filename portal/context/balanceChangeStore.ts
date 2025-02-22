import { create } from 'zustand';

interface BalanceChangeTypes {
    balanceChangeState: boolean;
    setBalanceState: () => void;
}


const useBalanceChangeState = create<BalanceChangeTypes>((set) => ({
    balanceChangeState: true,
    setBalanceState: () => set((state) => ({balanceChangeState: !state.balanceChangeState})),
}));

export default useBalanceChangeState;