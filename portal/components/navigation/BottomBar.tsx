"use client";

import "@/css/bottombar.css";
import Link from "next/link";
import avator from "@/public/avatars/snail.png";
import Image from "next/image";
import { IconHome, IconSwitchVertical } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();

  if(pathname.startsWith("/landing/")){
    return <></>
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

      <Link href="/portal/profile" className="profile-icon flex gap-2 items-center p-1 cursor-pointer">
        <span className="">
          <Image src={avator} alt="name" />
        </span>
      </Link>
    </div>
  );
}

export default BottomBar;
