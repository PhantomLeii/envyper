import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/projects/")({
  component: Index,
});

function Index() {
  return <div>Hello "/(auth)/projects/"!</div>;
}
