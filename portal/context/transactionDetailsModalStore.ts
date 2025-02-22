import { create } from "zustand";

interface TransactionDetailsState {
  transactionModalActive: boolean;
  setTransactionModalActive: () => void;
}

interface TransactionIDState {
  txId: string;
  setTxId: (id:string) => void;
}

const useTransactionDetailsModalStore = create<TransactionDetailsState>(
  (set) => ({
    transactionModalActive: false,
    setTransactionModalActive: () =>
      set((state) => ({
        transactionModalActive: !state.transactionModalActive,
      })),
  })
);

const useTransactionIDStore = create<TransactionIDState>((set) => ({
    txId: "",
    setTxId: (id: string) => set(() => ({ txId: id })),
  }));

export {useTransactionDetailsModalStore, useTransactionIDStore};
