import Navbar from "@/components/global/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "jcrea shop",
  description: "ecom shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
