import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/projects/_layout")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  return <div>Hello "/(auth)/projects/_layout"!</div>;
}
