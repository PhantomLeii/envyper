import React from "react";

interface AuthLayoutProps {
  children: Readonly<React.ReactNode>;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <>
      <main className="container w-full min-h-[calc(100vh-64px)] grid place-items-center">
        {props.children}
      </main>
    </>
  );
};

export default AuthLayout;
