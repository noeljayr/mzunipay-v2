"use client";

import Link from "next/link";
import {
  IconHome,
  IconSwitchVertical,
  IconCode,
} from "@tabler/icons-react";
import "@/css/sidebar.css";
import { usePathname } from "next/navigation";

import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import UpgradeCustomer from "../UpgradeCustomer";

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

        {user.account_type === "Merchant" ? (
          <>
            {/* <Link
              className={`${
                pathname.startsWith("/customers") ? "active-link" : ""
              }`}
              href="/customers"
            >
              <IconUsersGroup />
              Customers
            </Link> */}

            <span
              className={`flex flex-col  gap-1 relative ${
                pathname.startsWith("/portal/dev") ? "active-link" : ""
              }`}
            >
              <span className="flex gap-2 w-full">
                <IconCode />
                Developer
              </span>

              <span className="flex flex-col sub">
                <Link
                  className={`w-full pl-7 ${
                    pathname.startsWith("/portal/apis") ? "active-link" : ""
                  }`}
                  href="/portal/apis"
                >
                  API
                </Link>

                <Link className={`w-full pl-7 `} href="/landing/dev">
                  Documentation
                </Link>
              </span>
            </span>
          </>
        ) : (
          <></>
        )}

        {user.account_type == "Merchant" ? (
          <></>
        ) : (
         <UpgradeCustomer />
        )}
      </div>
    );
  }
}

export default SideBar;
