"use client";

import Link from "next/link";
import "@/css/sidebar.css";
import { usePathname } from "next/navigation";
import useDepositModalStore from "@/context/depositModalStore";
import useWidthdrawModalStore from "@/context/withdrawModalStore";
import useTransferModalStore from "@/context/transferModalStore";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import UpgradeCustomer from "../UpgradeCustomer";

import {
  IconHome,
  IconPlus,
  IconDownload,
  IconBuildingBank,
  IconArrowUp,
  IconSwitchVertical,
} from "@tabler/icons-react";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function SideBar() {
  const pathname = usePathname();
  const token = getCookie("token");
  const { setDepositModalActive } = useDepositModalStore();
  const { setWithdrawModalActive } = useWidthdrawModalStore();
  const { setTransferModalActive } = useTransferModalStore();

  if (pathname.startsWith("/landing/")) {
    return <></>;
  }

  if (token) {
    const user: TokenTypes = jwtDecode(token);
    return (
      <div className="flex flex-col gap-4 sidebar">
        <Link
          className={`${pathname == "/portal" ? "active-link" : ""}`}
          href="/"
        >
          <IconHome />
          Home
        </Link>

        <Link
          className={`${
            pathname.startsWith("/portal/transactions") ? "active-link" : ""
          }`}
          href="/portal/transactions"
        >
          <IconSwitchVertical />
          Transactions
        </Link>

        <Link onClick={setDepositModalActive} href="#deposit">
          <IconPlus />
          Deposit
        </Link>

        <Link onClick={setTransferModalActive} href="#transfer">
          <IconArrowUp />
          Transfer
        </Link>

        <Link onClick={setWithdrawModalActive} href="#withdraw">
          <IconDownload />
          Withdraw
        </Link>

        <Link
          className={`${
            pathname.startsWith("/portal/finance") ? "active-link" : ""
          }`}
          href="#"
        >
          <IconBuildingBank />
          Financial Services
        </Link>

        {user.account_type == "Merchant" ? <></> : <UpgradeCustomer />}
      </div>
    );
  }
}

export default SideBar;
