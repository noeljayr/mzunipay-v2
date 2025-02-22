"use client";
import "@/css/index.css";
import "@/css/overview.css";
import TransactionHistory from "@/components/transactions/TransactionHistory";
import TotalBalance from "@/components/overview/TotalBalance";
import CustomerMonthlyStats from "@/components/charts/CustomerMonthlyStats";
import TotalRevenue from "@/components/overview/TotalRevenue";
import ReturningCustomers from "@/components/overview/ReturingCustomers";
import TransactionDetails from "@/components/Modals/TransactionDetails";
import { getCookie } from "cookies-next/client";
import { jwtDecode } from "jwt-decode";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import Refund from "@/components/Modals/Refund";

type TokenTypes = {
  user_id: string;
  account_type: string;
  wallet_id: string;
  full_name: string;
  avatar: string;
};

export default function Home() {
  const token = getCookie("token");

  if (token) {
    const user: TokenTypes = jwtDecode(token);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div
        suppressHydrationWarning
        className={`index w-full ${
          user.account_type == "Merchant"
            ? "merchant-index custom-scrollbar"
            : "customer-index custom-scrollbar"
        } grid w-full h-full gap-4`}
      >
        <TotalBalance />
        {user.account_type === "Merchant" ? (
          width > 640 ? (
            <>
              <TotalRevenue />
              <ReturningCustomers />
            </>
          ) : (
            <div className="merchant-overview grid w-full h-full gap-4">
              <Swiper spaceBetween={15} slidesPerView={1.6}>
                <SwiperSlide>
                  {" "}
                  <TotalRevenue />
                </SwiperSlide>
                <SwiperSlide>
                  <ReturningCustomers />
                </SwiperSlide>
              </Swiper>
            </div>
          )
        ) : (
          <CustomerMonthlyStats />
        )}
        <div
          className={`history-charts grid
          }`}
        >
          <TransactionHistory />
        </div>
        
      </div>
    );
  }
}
