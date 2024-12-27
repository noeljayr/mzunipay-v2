"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
function LandingNav() {
  const pathname = usePathname();
  const [menuActive, setMenuActive] = useState(false);

  if (
    pathname == "/landing/login" ||
    pathname == "/landing/signup" ||
    pathname.startsWith("/landing/signup")
  ) {
    return <></>;
  }

  return (
    <>
      {menuActive ? (
        <div
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className="overlay"
        ></div>
      ) : (
        <></>
      )}

      <div className="landin-nav items-center flex justify-between top-0 left-0">
        <Link href="/landing">
          <h1>MzuniPay</h1>
        </Link>

        <div className="flex gap-4 items-center links">
          <Link href="/landing" className="">
            Home
          </Link>
          <Link href="/landing#features" className="">
            Features
          </Link>
          <Link href="/landing/dev" className="">
            Developers
          </Link>
        </div>

        <div className="cta-container flex gap-4">
          <Link href="/landing/login" className="cta-2">
            Login
          </Link>
          <Link href="/landing/signup" className="cta">
            Signup
          </Link>
        </div>

        <span
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className="nav-menu cursor-pointer"
        >
          <IconMenu2 />
        </span>
      </div>

      <div
        className={`landing-m-menu flex gap-2 flex-col ${
          menuActive ? "landing-m-menu-active" : ""
        }`}
      >
        <Link href="/lading" className="">
          Home
        </Link>
        <Link href="/landing#features" className="">
          Features
        </Link>
        <Link href="/landing/dev" className="">
          Developers
        </Link>

        <Link href="/landing/login" className="cta-2">
          Login
        </Link>
      </div>
    </>
  );
}

export default LandingNav;
