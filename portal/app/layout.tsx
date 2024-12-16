import type { Metadata } from "next";
import "@/css/globals.css";
import "@/css/modals.css";
import Topbar from "@/components/navigation/Topbar";
import SideBar from "@/components/navigation/SideBar";
import "@fontsource/lexend/100.css";
import "@fontsource/lexend/200.css";
import "@fontsource/lexend/300.css";
import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import "@fontsource/lexend/700.css";
import "@fontsource/lexend/800.css";
import "@fontsource/lexend/900.css";

export const metadata: Metadata = {
  title: "MzuniPay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <div className="main">
          <Topbar />
          <div className="main-content grid gap-4 px-4 pr-0">
            <SideBar />
            <div className="wrapper p-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
