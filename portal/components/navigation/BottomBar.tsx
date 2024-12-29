"use client";

import "@/css/bottombar.css";
import Link from "next/link";
import Image from "next/image";
import { IconHome, IconSwitchVertical } from "@tabler/icons-react";
import { usePathname } from "next/navigation";


import { IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect } from "react";

import { getCookie, deleteCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode"; // Correct the import, as `jwtDecode` is the default export
import { useRouter } from "next/navigation";

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

      <Link
        className={`${
          pathname.startsWith("/portal/transactions") ? "active-link" : ""
        }`}
        href="/portal/transactions"
      >
        <IconSwitchVertical />
        Transactions
      </Link>

      <Link
        href="#"
        className="profile-icon flex gap-2 items-center p-1 cursor-pointer"
      >
        <span className="">
          <Image
            src={require(`@/public/avatars/${decoded.avatar}.png`)}
            alt="name"
          />
        </span>
      </Link>
    </div>
  );
}

export default BottomBar;
