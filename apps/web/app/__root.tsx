import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Component as Navbar } from "@/components/NavbarMenu";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { NavigateOptions, ToOptions } from "@tanstack/react-router";

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing clerk publishable key");
}

const client = new QueryClient();

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={"/"}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <QueryClientProvider client={client}>
        <NextUIProvider
          navigate={(to, options) => router.navigate({ to, ...options })}
          useHref={(to) => router.buildLocation({ to }).href}
        >
          <Navbar />
          <div className="container mx-auto relative top-[64px] w-full py-2">
            <Outlet />
          </div>
        </NextUIProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
