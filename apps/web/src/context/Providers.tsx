import { HeroUIProvider } from "@heroui/react";
import type { NavigateOptions, ToOptions } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";

declare module "@react-types/shared" {
  interface RouterConfig {
    href: ToOptions["to"];
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers(props: ProviderProps) {
  const router = useRouter();

  return (
    <HeroUIProvider
      navigate={(to, options) => router.navigate({ to, ...options })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      {props.children}
    </HeroUIProvider>
  );
}
