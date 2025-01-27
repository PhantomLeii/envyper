import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@heroui/button";
import ProjectsTable from "@/components/ProjectsTable";

export const Route = createFileRoute("/(app)/projects/")({
  component: Projects,
});

function Projects() {
  return (
    <>
      <main className="container mx-auto flex flex-col justify-start items-center gap-6 py-6">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-extrabold">My Projects</h1>
          <Button color="primary" onPress={() => {}}>
            Add New
          </Button>
        </div>
        <ProjectsTable />
      </main>
    </>
  );
}
<div>Hello "/(app)/projects"!</div>;
