import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projects/")({
  component: Index,
});

function Index() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div>
      <h1>Projects</h1>
    </div>
  );
}
