import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@nextui-org/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Welcome to Envyper
              </h2>
              <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Professional Secret Manager
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="ghost">Sign In</Button>
              <Button color="primary">Get Started</Button>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut></SignedOut>
    </>
  );
}
