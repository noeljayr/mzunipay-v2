import { IconChevronDown, IconRefresh } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { BASE_URL } from "@/constants/constants";
import { formatDistanceToNow } from "date-fns";
import { getCookie, setCookie } from "cookies-next/client";

function TotalRefunded() {
  const token = getCookie("token");
  const [timeFrame, setTimeFrame] = useState("week");
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [refunds, setRefunds] = useState(0);
  const [period, setPeriod] = useState(timeFrame);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [relativeTime, setRelativeTime] = useState<string>("");

  const updateBalance = () => {
    const currentDate = new Date();
    setCookie("refund-last-update", currentDate.toISOString()); // Store the exact timestamp
  };

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `${BASE_URL}/merchants/metrics/refunds?period=${period}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsError(false);
          setRefunds(data.totalRefunded);
          setPercentage(data.refundChangePercentage);
          updateBalance(); // Update last fetched timestamp
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [refresh, period]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastUpdate = getCookie("refund-last-update");
      if (lastUpdate) {
        setRelativeTime(
          formatDistanceToNow(new Date(lastUpdate), { addSuffix: true })
        );
      }
    }, 1000); // Update relative time every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    setPeriod(timeFrame);
  }, [timeFrame]);

  return (
    <div className="content-container flex flex-col gap-2">
      <span className="flex">
        <h3 className="opacity-70"> Refunded</h3>

        <span
          onClick={() => {
            setOptionsActive(!optionsActive);
          }}
          className={`time-frame ml-auto ${
            optionsActive ? "time-frame-active" : ""
          }`}
        >
          This {timeFrame}
          <IconChevronDown className="ml-auto" />
          <span className="time-frame-options">
            <span
              className={timeFrame == "week" ? "active-frame" : ""}
              onClick={() => {
                setTimeFrame("week");
              }}
            >
              This Week
            </span>
            <span
              className={timeFrame == "month" ? "active-frame" : ""}
              onClick={() => {
                setTimeFrame("month");
              }}
            >
              This Month
            </span>
            <span
              className={timeFrame == "year" ? "active-frame" : ""}
              onClick={() => {
                setTimeFrame("year");
              }}
            >
              This Year
            </span>
          </span>
        </span>
      </span>
      <div className="flex items-center gap-1 w-full max-sm:flex-col justify-center m-auto">
        <h2>
          K{" "}
          <NumberFlow
            format={{
              notation: "standard",
              maximumFractionDigits: 2,
            }}
            trend={0}
            locales={"en-US"}
            value={refunds || 0}
            className="overview-number"
          />
        </h2>
        <span className="metric flex gap-1">
          <b
            className={
              percentage < 0 ? `decline` : percentage > 0 ? `growth` : `stale`
            }
          >
            {percentage < 0
              ? `${percentage}%`
              : percentage > 0
              ? `+${percentage}%`
              : `${percentage}%`}
          </b>
          <span className="opacity-50">vs last {timeFrame}</span>
        </span>
      </div>

      <span className="updated-time mt-auto flex items-center justify-between">
        <span
          onClick={() => {
            setRefresh(!refresh);
          }}
          className="mr-auto refresh-icon"
        >
          <IconRefresh />
        </span>

        <span className="lasted-updated  opacity-70">
          Last updated: {relativeTime || "-"}
        </span>
      </span>
    </div>
  );
}

export default TotalRefunded;
