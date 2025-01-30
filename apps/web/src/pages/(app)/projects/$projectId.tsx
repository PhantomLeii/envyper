import { createFileRoute } from "@tanstack/react-router";
import DeleteProjectModal from "@/components/DeleteProjectModal";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: Project,
});

function Project() {
  return (
    <>
      <main className="relative min-h-[calc(100vh-64px)] container mx-auto flex flex-col justify-start items-center gap-6 py-6">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-extrabold">Project Name</h1>
        </div>
        <DeleteProjectModal />
      </main>
    </>
  );
}
