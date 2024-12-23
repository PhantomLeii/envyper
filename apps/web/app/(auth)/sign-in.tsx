import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignIn,
});

function SignIn() {
  return <div>Hello "/(auth)/sign-in"!</div>;
}
