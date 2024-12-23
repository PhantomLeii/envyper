import { createFileRoute } from "@tanstack/react-router";
import { SignIn } from "@clerk/clerk-react";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignIn />
    </div>
  );
}
