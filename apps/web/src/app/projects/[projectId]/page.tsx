import React from "react";
import { fetchProjectById } from "@/data/fetchProjects";
import { Button } from "@nextui-org/button";
import { fetchVariables } from "@/data/fetchVariables";
import DeleteProjectModal from "@/components/ui/DeleteProjectModal";
import VariablesTable from "@/components/VariablesTable";

type ProjectProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Project({ params }: ProjectProps) {
  const { projectId } = await params;
  const { data: project } = await fetchProjectById(projectId);
  const { data: variables } = await fetchVariables(projectId);

  return (
    <div className="relative h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
          <p className="text-default-500">{project.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button color="primary">Add Secret</Button>
          <Button>Edit Project</Button>
        </div>
      </div>
      <VariablesTable data={variables} />
      <div className="absolute bottom-0 right-0 justify-end mt-6">
        <DeleteProjectModal projectId={projectId} />
      </div>
    </div>
  );
}
