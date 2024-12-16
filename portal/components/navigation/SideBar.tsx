"use client";

import React from "react";
import Link from "next/link";
import {
  IconBuildingStore,
  IconHome,
  IconSwitchVertical,
  IconCode,
  IconChevronDown,
  IconUsersGroup,
} from "@tabler/icons-react";
import "@/css/sidebar.css";
import { usePathname } from "next/navigation";

function SideBar() {
  const pathname = usePathname();
  const userType = "merchant";
  return (
    <div className="flex flex-col gap-4 sidebar">
      <Link className={`${pathname == "/" ? "active-link" : ""}`} href="/">
        <IconHome />
        Home
      </Link>

      <Link
        className={`${
          pathname.startsWith("/transactions") ? "active-link" : ""
        }`}
        href="/transactions"
      >
        <IconSwitchVertical />
        Transactions
      </Link>

      {userType == "merchant" ? (
        <>
          <Link
            className={`${
              pathname.startsWith("/transactions") ? "active-link" : ""
            }`}
            href="/transactions"
          >
            <IconUsersGroup />
            Customers
          </Link>

          <span
            className={`flex flex-col  gap-1 relative ${
              pathname.startsWith("/dev") ? "active-link" : ""
            }`}
          >
            <span className="flex gap-2 w-full">
              <IconCode />
              Developer
            </span>

            <span className="flex flex-col sub">
              <Link className="w-full pl-7" href="">
                API
              </Link>

              <Link className="w-full pl-7" href="">
                Documentation
              </Link>
            </span>
          </span>
        </>
      ) : (
        <></>
      )}

      {userType == "merchant" ? (
        <></>
      ) : (
        <div className="upgrade-to-merchant mb-4 flex gap-1 mt-auto flex-col p-2 py-3 items-center">
          <span className="merchant-icon">
            <IconBuildingStore />
          </span>

          <h3>Business account</h3>

          <p>
            Upgrade to a business account and start accepting payments on your
            e-commerce platforms.
          </p>

          <button>Upgrade</button>
        </div>
      )}
    </div>
  );
}

export default SideBar;
