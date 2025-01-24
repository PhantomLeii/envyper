import { Outlet, createRootRoute } from "@tanstack/react-router";
import Providers from "@/context/Providers";
import Navbar from "@/components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Providers>
      <Navbar />
      <Outlet />
    </Providers>
  );
}
