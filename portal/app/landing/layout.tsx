import type { Metadata } from "next";
import "@/css/landingpage.css";
import LandingNav from "@/components/navigation/LandingNav";
import Footer from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "MzuniPay Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
      <LandingNav />
      {children}
      <Footer />
    </div>
  );
}
