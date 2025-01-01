import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const meta: Metadata = {
  title:
    "Envyper | The best way to manage your environment variables in development",
  description:
    "Envyper is a tool that helps you manage your environment variables in development",
  keywords: [
    "envyper",
    "env",
    "environment",
    "variables",
    "development",
    "management",
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{props.children}</body>
    </html>
  );
}
