import { createFileRoute /* useParams */ } from "@tanstack/react-router";
import DeleteProjectModal from "@/components/DeleteProjectModal";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: Project,
});

function Project() {
  // const { projectId } = useParams({ from: "/(app)/projects/$projectId" });

  return (
    <>
      <main className="relative container mx-auto flex flex-col justify-start items-center gap-6 py-6">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-4xl font-extrabold">Project Name</h1>
        </div>
        <DeleteProjectModal />
      </main>
    </>
  );
}
