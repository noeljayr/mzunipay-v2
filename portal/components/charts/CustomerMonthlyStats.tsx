"use client";

import React, { useEffect, useState } from "react";
import Loading from "../ux/Loading";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

function CustomerMonthlyStats() {
  const [chartData, setChartData] = useState<any>(null); // State to hold chart data
  const [loading, setLoading] = useState<boolean>(true);

  const token = getCookie("token");
  const user: TokenTypes = jwtDecode(token || "");

  const wallet_id = user.wallet_id;

  useEffect(() => {
    // Fetch transaction data
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the request header
            },
            params: {
              wallet_id, // Filter by wallet_id
            },
          }
        );

        const { transactions } = response.data;

        // Process transactions to get monthly cash-in and cash-out data
        const monthlyData = Array(12).fill(0); // Initialize an array for 12 months
        const monthlyCashOut = Array(12).fill(0);

        transactions.forEach((transaction: any) => {
          const date = new Date(transaction.created_at);
          const month = date.getMonth(); // Get the month (0-11)

          if (transaction.to_wallet_id === wallet_id) {
            // Cash in
            monthlyData[month] += transaction.amount;
          } else if (transaction.from_wallet_id === wallet_id) {
            // Cash out
            monthlyCashOut[month] += transaction.amount;
          }
        });

        // Prepare chart data
        setChartData({
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Cash In",
              data: monthlyData,
              borderColor: "#129549",
              borderWidth: 2,
              backgroundColor: "#129549",
              tension: 0.3,
            },
            {
              label: "Cash Out",
              data: monthlyCashOut,
              borderColor: "#FF6666",
              borderWidth: 2,
              backgroundColor: "#FF6666",
              tension: 0.3,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [wallet_id, token]);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number) => `${value / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="content-container flex flex-col monthly-stats">
      <h3 className="opacity-70">Monthly Stats</h3>
      <div className="legend flex gap-4">
        <span className="cash-in flex gap-1 items-center mb-1">
          <span></span>
          Cash in
        </span>
        <span className="cash-out flex gap-1 items-center mb-1">
          <span></span>
          Cash out
        </span>
      </div>
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div style={{ width: "100%", height: "95%" }}>
          {chartData ? (
            <Line data={chartData} options={options} />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="success">
              Your monthly stats will show here.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerMonthlyStats;
