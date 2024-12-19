"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
function LandingNav() {
  const pathname = usePathname();

  if (pathname == "/landing/login" || pathname == "/landing/signup") {
    return <></>;
  }

  return (
    <div className="landin-nav items-center flex justify-between top-0 left-0">
      <Link href="/landing">
        <h1>MzuniPay</h1>
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/lading" className="">
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
    </div>
  );
}

export default LandingNav;
