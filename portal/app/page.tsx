"use client";
import "@/css/index.css";
import TransactionHistory from "@/components/transactions/TransactionHistory";
import TotalBalance from "@/components/TotalBalance";
import CustomerMonthlyStats from "@/components/charts/CustomerMonthlyStats";
import Deposit from "@/components/Modals/Deposit";
import Withdraw from "@/components/Modals/Withdraw";
import Transfer from "@/components/Modals/Transfer";

export default function Home() {
  const userType = "merchant";
  return (
    <div
      className={`index ${
        userType == "merchant" ? "merchant-index" : ""
      } grid w-full h-full gap-4`}
    >
      <TotalBalance />
      {userType === "merchant" ? (
        <div className="merchant-overview grid w-full h-full gap-4">
          <div className="content-container"></div>
          <div className="content-container"></div>
          <div className="content-container"></div>
          <div className="content-container"></div>
        </div>
      ) : (
        <CustomerMonthlyStats />
      )}
      <div
        className={`history-charts grid ${
          userType == "merchant" ? "two-columns gap-4" : ""
        }`}
      >
        <TransactionHistory />
        <div className="content-container"></div>
      </div>
      <Deposit />
      <Withdraw />
      <Transfer />
    </div>
  );
}
