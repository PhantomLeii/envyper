import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@nextui-org/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full grid place-items-center">
      <h1 className="text-6xl tracking-wide font-bold">Hello from INDEX.tsx</h1>
      <Button color="primary">Click me</Button>
    </div>
  );
}
