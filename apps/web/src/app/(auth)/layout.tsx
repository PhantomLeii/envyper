import React from "react";

interface AuthLayoutProps {
  children: Readonly<React.ReactNode>;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return <main>{props.children}</main>;
};

export default AuthLayout;
