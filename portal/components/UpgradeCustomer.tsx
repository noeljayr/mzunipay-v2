"use client";

import { IconBuildingStore } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/constants";
import { jwtDecode } from "jwt-decode";
import LoadingLight from "./ux/LoadingLight";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function UpgradeCustomer() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [user_id, setUserId] = useState("");
  const token = getCookie("token");
  const user: TokenTypes = jwtDecode(token || "");
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setUserId(user.user_id);
  }, [token, user.user_id]);

  useEffect(() => {
    if (isUpgraded) {
      deleteCookie("token");
      router.push("/landing");
    }
  }, [isUpgraded]);

  const upgradeToMerchant = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`${BASE_URL}/users/upgrade-to-merchant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      });

      if (!response.ok) {
        setIsError(true);
        return;
      }

      if (response.ok) {
        setIsUpgraded(true);
      }
    } catch (e: any) {
      console.error("Upgrading Error:", e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upgrade-to-merchant mb-4 flex gap-1 mt-auto flex-col p-2 py-3 items-center">
      {confirm ? (
        <div className="flex items-center flex-col justify-center h-full w-full">
          <h3 className="text-center">Upgrading to business account</h3>

          <div className="flex cta-container gap-2 mt-2">
            <button
              className=""
              onClick={() => setConfirm(false)}
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              className=""
              onClick={upgradeToMerchant}
              disabled={isLoading}
            >
              {isLoading
              ? <LoadingLight />
              : isError
              ? "Try again"
              : isUpgraded
              ? "Logging out"
              : "Upgrade"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="merchant-icon">
            <IconBuildingStore />
          </span>

          <h3>Business account</h3>

          <p className="text-center">
            Upgrade to a business account and start accepting payments on your
            e-commerce platforms.
          </p>

          <button
            onClick={() => {
              setConfirm(true);
            }}
            disabled={isLoading}
          >
            Upgrade
          </button>
        </>
      )}
    </div>
  );
}

export default UpgradeCustomer;
