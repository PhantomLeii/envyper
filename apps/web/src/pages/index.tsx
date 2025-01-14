import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="h-screen w-full grid place-items-center">
      <h1 className="text-6xl tracking-wide font-bold">Hello from INDEX.tsx</h1>
    </div>
  );
}
