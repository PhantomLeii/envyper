import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignOut,
});

function SignOut() {
  return <div>Hello "/(auth)/sign-out"!</div>;
}
