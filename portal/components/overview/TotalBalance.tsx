"use client";
import {
  IconRefresh,
} from "@tabler/icons-react";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next/client";
import { BASE_URL } from "@/constants/constants";
import { formatDistanceToNow } from "date-fns";
import useBalanceChangeState from "@/states/balanceChangeStore";

function TotalBalance() {
  const token = getCookie("token");
  const [balance, setBalance] = useState<number>(0);
  const [refresh, setRefresh] = useState(false);
  const [relativeTime, setRelativeTime] = useState<string>("");
  const { balanceChangeState } = useBalanceChangeState();

  const updateBalance = () => {
    const currentDate = new Date();
    setCookie("balance-last-update", currentDate.toISOString()); // Store the exact timestamp
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${BASE_URL}/wallets/balance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setBalance(data.balance);
          updateBalance(); // Update last fetched timestamp
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log("");
      }
    };

    fetchBalance();
  }, [refresh, balanceChangeState]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastUpdate = getCookie("balance-last-update");
      if (lastUpdate) {
        setRelativeTime(
          formatDistanceToNow(new Date(lastUpdate), { addSuffix: true })
        );
      }
    }, 1000); // Update relative time every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col gap-1 h-full total-balance">
      <div className="content-container h-full overview-metric flex flex-col gap-2">
        <h3 className="opacity-70">Balance</h3>

        <h1 className="mb-2 mt-auto ml-2 truncate flex items-center gap-1">
          K{" "}
          <NumberFlow
            format={{
              notation: "standard",
              maximumFractionDigits: 2,
            }}
            trend={0}
            locales={"en-US"}
            value={balance || 0}
          />
        </h1>

        <span className="updated-time mt-auto flex items-center justify-between">
          <span
            onClick={() => {
              setRefresh(!refresh);
            }}
            className="mr-auto refresh-icon"
          >
            <IconRefresh />
          </span>

          <span className="lasted-updated opacity-70">
            Last updated: {relativeTime || ""}
          </span>
        </span>
      </div>
    </div>
  );
}

export default TotalBalance;
