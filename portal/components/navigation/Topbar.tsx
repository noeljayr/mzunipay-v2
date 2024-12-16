import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import Profile from "./Profile";
import "@/css/topbar.css";

function Topbar() {
  return (
    <div className="topbar p-4 flex justify-between">
      <Link href="/">
        <h1>MzuniPay</h1>
      </Link>

      <div className="ml-auto flex gap-4">
        <div className="notification-btn cursor-pointer">
          <IconBell />
        </div>

        <Profile />
      </div>
    </div>
  );
}

export default Topbar;
