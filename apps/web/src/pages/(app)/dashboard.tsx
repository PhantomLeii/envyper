import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
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
