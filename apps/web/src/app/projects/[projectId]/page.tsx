import React from "react";
import { fetchProjectById } from "@/data/fetchProjects";
import { Button } from "@nextui-org/button";

type ProjectProps = {
  params: {
    projectId: string;
  };
};

export default async function Project({ params }: ProjectProps) {
  const { data } = await fetchProjectById(params.projectId);

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">{data.name}</h1>
          <p className="text-default-500">{data.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button color="primary">Add Secret</Button>
          <Button>Edit Project</Button>
        </div>
      </div>
    </>
  );
}
