"use client";
import "@/css/index.css";
import "@/css/overview.css";
import TransactionHistory from "@/components/transactions/TransactionHistory";
import TotalBalance from "@/components/overview/TotalBalance";
import CustomerMonthlyStats from "@/components/charts/CustomerMonthlyStats";
import Deposit from "@/components/Modals/Deposit";
import Withdraw from "@/components/Modals/Withdraw";
import Transfer from "@/components/Modals/Transfer";
import TotalRevenue from "@/components/overview/TotalRevenue";
import TotalRefunded from "@/components/overview/TotalRefunded";
import NewCustomers from "@/components/overview/NewCustomers";
import ReturningCustomers from "@/components/overview/ReturingCustomers";
import TransactionDetails from "@/components/Modals/TransactionDetails";
import { getCookie } from 'cookies-next/client';
import { jwtDecode } from "jwt-decode";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

export default function Home() {

  const token = getCookie('token');
  
  if(token){
    const user: TokenTypes = jwtDecode(token);

    return (
      <div
        suppressHydrationWarning
        className={`index w-full ${
          user.account_type == "Merchant"
            ? "merchant-index custom-scrollbar"
            : "customer-index"
        } grid w-full h-full gap-4`}
      >
        <TotalBalance />
        {user.account_type === "Merchant" ? (
          <div className="merchant-overview grid w-full h-full gap-4">
            <TotalRevenue />
            <TotalRefunded />
            <NewCustomers />
            <ReturningCustomers />
          </div>
        ) : (
          <CustomerMonthlyStats />
        )}
        <div
          className={`history-charts grid
          }`}
        >
          <TransactionHistory />
          
        </div>
        <Deposit />
        <Withdraw />
        <Transfer />
        <TransactionDetails />
      </div>
    );
  }
}
