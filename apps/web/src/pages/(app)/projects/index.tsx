import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/projects/")({
  component: Projects,
});

function Projects() {
  return <div>Hello "/(app)/projects"!</div>;
}
