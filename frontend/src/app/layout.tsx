import type { Metadata } from "next";
// import localFont from "next/font/local";
import "@/app/global.css";
import { Abril_Fatface, Open_Sans } from "next/font/google";

import ClientProviders from "@/contexts/ClientProviders";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";

const OpenSans = Open_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={OpenSans.className}>
        <ClientProviders>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
          <Header />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
