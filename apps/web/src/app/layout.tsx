import React from "react";
import { Roboto } from "next/font/google";
import Providers from "../context/Providers";
import "./globals.scss";
import Navbar from "@/components/Navbar";

export const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

const RootLayout = (props: RootLayoutProps) => {
  return (
    <Providers>
      <html lang="en" className="dark">
        <body className={`${roboto.className}`}>
          <Navbar />
          {props.children}
        </body>
      </html>
    </Providers>
  );
};

export default RootLayout;
