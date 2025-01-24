import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@heroui/button";
import { useAuth } from "@/context/Authentication";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <main className="min-h-[calc(100vh-64px)] max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900">
                  Active Environments
                </h2>
                <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900">
                  Total Projects
                </h2>
                <p className="text-3xl font-bold text-indigo-600 mt-2">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Activity
                </h2>
                <p className="text-gray-500 mt-2">No recent activity</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

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
