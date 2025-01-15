"use client";

import "@/css/bottombar.css";
import Link from "next/link";
import Image from "next/image";
import {
  IconArrowUp,
  IconDownload,
  IconHome,
  IconMenu2,
  IconPlus,
  IconSwitchVertical,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import { IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect } from "react";

import { getCookie, deleteCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode"; // Correct the import, as `jwtDecode` is the default export
import { useRouter } from "next/navigation";
import useDepositModalStore from "@/states/depositModalStore";
import useWidthdrawModalStore from "@/states/withdrawModalStore";
import useTransferModalStore from "@/states/transferModalStore";
import { useMenuStore } from "@/states/menuStore";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function BottomBar() {
  const pathname = usePathname();
  const [decoded, setDecoded] = useState<TokenTypes | null>(null); // State to store the decoded token
  const router = useRouter();
  const { setDepositModalActive } = useDepositModalStore();
  const { setWithdrawModalActive } = useWidthdrawModalStore();
  const { setTransferModalActive } = useTransferModalStore();
  const { setMenuActive } = useMenuStore();

  const logout = () => {
    deleteCookie("token");
    router.push("/landing");
  };

  useEffect(() => {
    // Retrieve and decode the token after the component mounts
    const token = getCookie("token") as string | undefined;
    if (token) {
      try {
        const decodedToken = jwtDecode<TokenTypes>(token);
        setDecoded(decodedToken);
      } catch (err) {
        console.error("Error decoding token", err);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  if (!decoded) {
    // Optionally render a placeholder or nothing if no token is available
    return null;
  }

  if (pathname.startsWith("/landing/")) {
    return <></>;
  }

  return (
    <div className="flex gap-4 fixed justify-between items-center px-2 py-2 bottom-0 left-0 bottombar">
      <Link className={`${pathname == "/" ? "active-link" : ""}`} href="/">
        <IconHome />
        Home
      </Link>

      <Link onClick={setDepositModalActive} href="#">
        <IconPlus />
        Deposit
      </Link>

      <Link onClick={setTransferModalActive} href="#">
        <IconArrowUp />
        Transfer
      </Link>

      <Link onClick={setWithdrawModalActive} href="#">
      <IconDownload />
        Withdraw
      </Link>

      <div onClick={setMenuActive} className="cursor-pointer">
        <IconMenu2 />
        
      </div>

      {/* <Link
        href="#"
        className="profile-icon flex gap-2 items-center p-1 cursor-pointer"
      >
        <span className="">
          <Image
            src={require(`@/public/avatars/${decoded.avatar}.png`)}
            alt="name"
          />
        </span>
      </Link> */}
    </div>
  );
}

export default BottomBar;
