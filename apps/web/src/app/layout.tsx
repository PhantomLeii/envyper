import React from "react";
import { Roboto } from "next/font/google";
import { Metadata } from "next";
import Providers from "../context/Providers";
import Navbar from "@/components/Navbar";
import "./globals.scss";

export const meta: Metadata = {
  title:
    "Envyper | Your one-stop solution for environment variable management.",
  description: "Your one-stop solution for environment variable management.",
};

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
