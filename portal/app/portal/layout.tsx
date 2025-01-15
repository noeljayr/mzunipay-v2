"use client";

import "@/css/modals.css";
import BottomBar from "@/components/navigation/BottomBar";
import Topbar from "@/components/navigation/Topbar";
import SideBar from "@/components/navigation/SideBar";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next/client";
import { useMenuStore } from "@/states/menuStore";
import MobileMenu from "@/components/navigation/MobileMenu";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getCookie("token");
  const { menuActive } = useMenuStore();

  if (token) {
    const user: TokenTypes = jwtDecode(token);

    return (
      <div className={"h-screen"} suppressHydrationWarning>
        <div className="main">
          <Topbar />
          <MobileMenu />
          <div
            className={`main-content ${
              user.account_type === "Customer" ? "customer-content" : ""
            } grid gap-4 sm:px-4 max-sm:px-2 pr-0`}
          >
            <SideBar />
            <div className="wrapper p-4 pr-0">{children}</div>
          </div>
        </div>
        <BottomBar />
      </div>
    );
  }
}
