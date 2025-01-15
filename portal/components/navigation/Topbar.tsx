"use client";

import Link from "next/link";
import {
  IconBell,
  IconChevronDown,
  IconMenu,
  IconMenu2,
  IconMenu3,
} from "@tabler/icons-react";
import Profile from "./Profile";
import "@/css/topbar.css";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function Topbar() {
  const token = getCookie("token");
  const pathname = usePathname();
  const [showDev, setShowDev] = useState(false);

  if (pathname.startsWith("/landing/")) {
    return <></>;
  }
  if (token) {
    const user: TokenTypes = jwtDecode(token);
    return (
      <div className="topbar p-4 flex justify-between items-center">
        <Link href="/">
          <h1>MzuniPay</h1>
        </Link>

        <div className="ml-auto flex gap-4 items-center">
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
                className={`flex flex-col   gap-1 relative ${
                  showDev ? "show-dev" : ""
                }`}
              >
                <span
                  onClick={() => {
                    setShowDev(!showDev);
                  }}
                  className="dev-btn flex gap-1 w-full relative cursor-pointer"
                >
                  Developer
                  <IconChevronDown className="ml-4" />
                </span>

                <span className={`flex flex-col sub absolute`}>
                  <Link
                    className={`w-full ${
                      pathname.startsWith("/portal/apis") ? "active-link" : ""
                    }`}
                    href="/portal/apis"
                  >
                    API
                  </Link>

                  <Link className={`w-full`} href="/landing/dev">
                    Documentation
                  </Link>
                </span>
              </span>
            </>
          ) : (
            <></>
          )}

          <div className="notification-btn cursor-pointer">
            <IconBell />
          </div>

        

          <Profile />
        </div>
      </div>
    );
  }
}

export default Topbar;
