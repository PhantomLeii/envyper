import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/clerk-react";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SignUp />
    </div>
  );
}
