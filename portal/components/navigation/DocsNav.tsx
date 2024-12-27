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
          Getting Started
        </Link>
        <Link href="/landing/dev/usage">Usage</Link>
        <Link href="/landing/dev/styling">Styling</Link>
        <div className="flex flex-col gap-2">
          Code Samples
          <div className="flex flex-col gap-2 pl-2 truncate">
            <Link className="truncate" href="/landing/dev/samples/cdn">
              Javascript (CDN)
            </Link>
            <Link className="truncate" href="/landing/dev/samples/react">
              React
            </Link>
            {/* <Link href="/landing/dev/samples/vue">Vue</Link> */}
            <Link className="truncate" href="/landing/dev/samples/php">
              PHP
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DocsNav;
