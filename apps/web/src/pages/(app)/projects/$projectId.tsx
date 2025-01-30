import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { getProjectById } from "@/api/projects";
import DeleteProjectModal from "@/components/DeleteProjectModal";
import CreateSecretModal from "@/components/CreateSecretModal";
import { Spinner } from "@heroui/react";
import { EditProjectModal } from "@/components/EditProjectModal";

export const Route = createFileRoute("/(app)/projects/$projectId")({
  component: Project,
});

function Project() {
  const { projectId } = useParams({ from: "/(app)/projects/$projectId" });

  const { data, isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: async () => getProjectById(Number.parseInt(projectId)),
  });

  console.log(data);

  if (isLoading) {
    return (
      <main className="relative min-h-[calc(100vh-64px)] container mx-auto flex flex-col justify-center items-center gap-6 py-6">
        <Spinner />
      </main>
    );
  }

  return (
    <>
      <main className="relative min-h-[calc(100vh-64px)] container mx-auto flex flex-col justify-start items-center gap-6 py-6">
        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <span className="flex items-center gap-4">
              <h1 className="text-4xl font-extrabold">{data?.name}</h1>
              <EditProjectModal projectId={projectId} />
            </span>
            <CreateSecretModal />
          </div>
          <p className="text-default-500 text-lg">{data?.description}</p>
        </div>

        <DeleteProjectModal projectId={projectId} />
      </main>
    </>
  );
}
