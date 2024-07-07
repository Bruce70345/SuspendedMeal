// 'use client'
import { Inter } from "next/font/google";
// import "./globals.css";
import NavBar from "@/app/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "愛心餐地圖",
  description: "一起好好長大",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
