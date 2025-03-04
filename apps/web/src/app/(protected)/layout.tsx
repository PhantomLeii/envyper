import React from "react";

interface AppLayoutProps {
  children: Readonly<React.ReactNode>;
}

const AppLayout = (props: AppLayoutProps) => {
  return <main>{props.children}</main>;
};

export default AppLayout;
