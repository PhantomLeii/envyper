import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@nextui-org/button";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { user } = useClerk();

  return (
    <>
      <SignedOut>
        <div className="flex flex-col items-start justify-center min-h-[calc(100vh-64px)] p-4">
          <h1 className="text-6xl font-bold tracking-wide mb-4">Envyper</h1>
          <p className="text-2xl mb-8 text-center">
            Your secure environment variable management solution
          </p>
          <div className="space-y-4">
            <Button size="lg" color="primary" href="/sign-in">
              Sign In
            </Button>
            <p className="text-sm text-gray-400">
              Manage your environment variables with confidence
            </p>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-start justify-center min-h-[calc(100vh-64px)] p-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome, {user?.firstName}
          </h1>
          <div className="space-y-4">
            <Button as={Link} size="lg" color="primary" href="/projects">
              View Projects
            </Button>
            <p className="text-xl tracking-tight text-gray-400">
              Start managing your environment variables
            </p>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
