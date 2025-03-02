import React from "react";

interface RootLayoutProps {
  children: Readonly<React.ReactNode>;
}

const RootLayout = (props: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
};

export default RootLayout;
