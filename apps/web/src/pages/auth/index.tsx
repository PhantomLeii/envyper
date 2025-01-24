import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: AuthenticationForm,
});

function AuthenticationForm() {
  return <div>Hello "/auth/"!</div>;
}
