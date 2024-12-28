"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";

function DocsNav() {
  const pathname = usePathname();
  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      {menuActive ? (
        <div
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className="overlay-dev-page"
        ></div>
      ) : (
        <></>
      )}
      <div
        className={`flex doc-nav flex-col gap-2 ${
          menuActive ? "nav-active" : ""
        }`}
      >
        <span
          onClick={() => {
            setMenuActive(!menuActive);
          }}
          className="docs-menu cursor-pointer"
        >
          <IconMenu2 />
        </span>
        <Link
          className={pathname == "/landing/dev/" ? "active-link" : ""}
          href="/landing/dev/"
        >
          Overview
        </Link>

        <Link href='/landing/dev/status-handlers' className="flex flex-col gap-2">Status Handlers</Link>
      </div>
    </>
  );
}

export default DocsNav;
