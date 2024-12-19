"use client";

import { IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  if (pathname == "/landing/login" || pathname == "/landing/signup") {
    return <></>;
  }

  return (
    <div className="footer max-sm:flex-col max-sm:gap-8 flex gap-4 justify-between">
      <h1>MzuniPay</h1>

      <div className="flex flex-col gap-2">
        <b>Browse</b>
        <Link href="/landing">Home</Link>
        <Link href="/landing#features">Features</Link>
        <Link href="/landing/dev">Developers</Link>
      </div>

      <div className="flex flex-col gap-2">
        <b>Contact</b>
        <Link
          href="mailto:noeljayr01@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          noeljayr01@gmail.com
        </Link>
        <Link
          href="tel:+265886047774"
          target="_blank"
          rel="noopener noreferrer"
        >
          +265886047774
        </Link>

        <Link
          className="cta-2"
          href="https://www.linkedin.com/in/noel-jr-luhanga-2890a5229/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandLinkedin /> LinkedIn{" "}
        </Link>
      </div>
    </div>
  );
}

export default Footer;
