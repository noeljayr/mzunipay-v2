import type { Metadata } from "next";
import "@/css/dev.css";
import DocsNav from "@/components/navigation/DocsNav";

export const metadata: Metadata = {
  title: "MzuniPay Developers Guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dev flex-col h-full gap-16 overflow-y-auto overflow-x-hidden pr-8 grid">
      <DocsNav />
      <div className="doc-content pt-24 flex flex-col gap-4">{children}</div>
    </div>
  );
}
