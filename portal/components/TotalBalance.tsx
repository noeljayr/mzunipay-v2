"use client";
import {
  IconDownload,
  IconPlus,
  IconRefresh,
  IconSwitchVertical,
} from "@tabler/icons-react";
import useDepositModalStore from "@/states/depositModalStore";
import useWidthdrawModalStore from "@/states/withdrawModalStore";
import useTransferModalStore from "@/states/transferModalStore";

function TotalBalance() {
  const { setDepositModalActive } = useDepositModalStore();
  const { setWithdrawModalActive } = useWidthdrawModalStore();
  const { transferModalActive, setTransferModalActive } =
    useTransferModalStore();

  return (
    <div className="flex flex-col gap-1 h-full total-balance">
      <div className="content-container h-full overview-metric flex flex-col gap-2">
        <h3 className="opacity-70">Total Balance</h3>

        <h1 className="mb-2 mt-auto">K 10, 000</h1>

        <span className="updated-time mt-auto flex items-center justify-between">
          <span className="mr-auto refresh-icon">
            <IconRefresh />
          </span>

          <span className="lasted-updated  opacity-70">
            Last updated: Just now
          </span>
        </span>
      </div>

      <div className="content-container gap-2 w-full grid quick-actions">
        <button onClick={setDepositModalActive} className="cta-2">
          <IconPlus />
          Deposit
        </button>
        <button onClick={setTransferModalActive} className="cta-2">
          <IconSwitchVertical />
          Transfer
        </button>
        <button onClick={setWithdrawModalActive} className="cta-2">
          <IconDownload />
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default TotalBalance;
