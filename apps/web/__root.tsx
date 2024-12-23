import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Component as Navbar } from "@/components/NavbarMenu";
import { NextUIProvider } from "@nextui-org/react";
import type { NavigateOptions, ToOptions } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const router = useRouter();

  return (
    <NextUIProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      <Navbar />
      <Outlet />
    </NextUIProvider>
  );
}
