"use client";

import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getCookie, deleteCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import usePersonalDetailsModalStore from "@/context/personalDetailsModal";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function Profile() {
  const [profileOptionsActive, setProfileOptionsActive] = useState(false);
  const [decoded, setDecoded] = useState<TokenTypes | null>(null); // State to store the decoded token
  const router = useRouter();
  const { detailsUpdated } = usePersonalDetailsModalStore();

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
  }, [detailsUpdated]); // Empty dependency array ensures this runs only once on mount

  if (!decoded) {
    return null;
  }

  return (
    <div
      onClick={() => {
        setProfileOptionsActive(!profileOptionsActive);
      }}
      className={`profile-btn ${
        profileOptionsActive ? "profile-options-active" : ""
      } flex gap-2 items-center relative p-1`}
    >
      <span className="cursor-pointer profile-icon max-sm:truncate">
        <Image
          src={require(`@/public/avatars/${decoded.avatar}.png`)}
          alt={decoded.full_name}
          width={500}
          height={500}
        />
      </span>
      <span className="cursor-pointer max-sm:truncate">
        {decoded.full_name}
      </span>
      <IconChevronDown className="ml-auto cursor-pointer" />

      <div className="profile-options absolute flex flex-col">
        <Link href="/portal/profile">Profile</Link>
        <span
          onClick={() => {
            logout();
          }}
          className="cursor-pointer"
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export default Profile;
