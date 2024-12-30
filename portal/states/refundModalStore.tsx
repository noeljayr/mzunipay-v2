import { create } from "zustand";

interface RefundModalState {
  refundModalActive: boolean;
  setRefundModalActive: () => void;
}



const useRefundModalStore = create<RefundModalState>((set) => ({
  refundModalActive: false,
  setRefundModalActive: () =>
    set((state) => ({ refundModalActive: !state.refundModalActive })),
}));

export default useRefundModalStore;
