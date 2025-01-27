import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader, CardBody } from "@heroui/card";

export const Route = createFileRoute("/(app)/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <main className="container mx-auto min-h-[calc(100vh-64px)] w-full py-6">
        <Card fullWidth className="p-4">
          <CardHeader as={"div"} className="mb-6">
            <h1 className="text-2xl md:text-4xl font-semibold">Dashboard</h1>
          </CardHeader>
          <CardBody as="div" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 rounded-lg">
              <CardBody>
                <h2 className="text-lg font-medium">Active Environments</h2>
                <p className="text-3xl font-bold text-secondary-500 mt-2">0</p>
              </CardBody>
            </Card>

            <Card className="p-4 rounded-lg">
              <CardBody>
                <h2 className="text-lg font-medium">Total Projects</h2>
                <p className="text-3xl font-bold text-secondary-600 mt-2">0</p>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </main>
    </>
  );
}
