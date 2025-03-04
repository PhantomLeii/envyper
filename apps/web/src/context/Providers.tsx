"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = (props: ProvidersProps) => {
  return <HeroUIProvider>{props.children}</HeroUIProvider>;
};

export default Providers;
