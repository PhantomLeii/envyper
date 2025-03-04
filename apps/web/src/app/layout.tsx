import React from "react";
import { Roboto } from "next/font/google";
import "./globals.scss";

export const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

const RootLayout = (props: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>{props.children}</body>
    </html>
  );
};

export default RootLayout;
