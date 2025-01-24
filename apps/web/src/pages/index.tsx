import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@heroui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <main className="min-h-[calc(100vh-64px)] max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid place-items-center">
        <div className="text-center">
          <h1 className="text-5xl tracking-tight font-extrabold md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-indigo-600">Envyper</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-default-500 text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The modern platform for managing your development environment
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="flex flex-col gap-4 md:flex-row md:gap-0 md:space-x-4">
              <Button color="primary" size="lg" as={Link} href="/auth">
                Get Started
              </Button>
              <Button size="lg" as={Link} href="/about">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
