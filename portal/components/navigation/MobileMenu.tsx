"use client";
import { useMenuStore } from "@/context/menuStore";
import {
  IconArrowLeft,
  IconBuildingBank,
  IconDownload,
  IconSwitchVertical,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UpgradeCustomer from "../UpgradeCustomer";
import { deleteCookie, getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import useWidthdrawModalStore from "@/context/withdrawModalStore";
import Profile from "./Profile";
type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function MobileMenu() {
  const { menuActive, setMenuActive } = useMenuStore();
  const pathname = usePathname();
  const router = useRouter();
  const token = getCookie("token");
  const { setWithdrawModalActive } = useWidthdrawModalStore();

  const logout = () => {
    deleteCookie("token");
    router.push("/landing");
  };

  if (token) {
    const user: TokenTypes = jwtDecode(token);
    return (
      <>
        {menuActive ? (
          <div onClick={setMenuActive} className="modal-overlay"></div>
        ) : (
          <></>
        )}

        <div
          className={`modal ${
            menuActive ? "modal-active mobile-menu-modal" : ""
          }`}
        >
          <h1 className="">
            <span
              onClick={setMenuActive}
              className="close flex gap-1 font-normal"
            >
              <IconX />
              Close
            </span>
          </h1>

          <Link
            className={`${
              pathname.startsWith("/portal/transactions") ? "active-link" : ""
            }`}
            href="/portal/transactions"
          >
            <IconSwitchVertical />
            Transactions
          </Link>

          <Link onClick={setWithdrawModalActive} href="#">
            <IconDownload />
            Withdraw
          </Link>

          <Link
            className={` ${
              pathname.startsWith("/portal/finance") ? "active-link" : ""
            }`}
            href="#"
          >
            <IconBuildingBank />
            Financial Services
          </Link>

          <span className="flex flex-col mt-auto">
            {user.account_type == "Merchant" ? <></> : <UpgradeCustomer />}
            <Profile />
          </span>
        </div>
      </>
    );
  }
}

export default MobileMenu;
