import { Card, CardHeader } from "@heroui/card";
import React from "react";

interface AppLayoutProps {
  children: Readonly<React.ReactNode>;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <main className="container w-full grid grid-cols-10 gap-6">
      <Card className="col-span-3 rounded p-6 flex gap-4" fullWidth>
        <CardHeader className="flex items-center">
          <img
            className="w-32 h-32 rounded-full"
            src="https://avatars.githubusercontent.com/u/6216367?v=4"
            alt="Avatar"
          />
          <h1 className="text-xl font-bold mt-4">John Doe</h1>
          <p className="text-sm text-gray-500">Software Engineer at Company</p>
        </CardHeader>
      </Card>
      {props.children}
    </main>
  );
};

export default AppLayout;
