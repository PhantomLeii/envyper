import { Project, CreateProject } from "@/schema/projects";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects/");
  const body = await res.json();
  return body.data;
}

export async function getProjectById(projectId: number): Promise<Project> {
  const res = await fetch(`/api/projects/${projectId}/`);
  return await res.json();
}

export async function createProject(data: CreateProject): Promise<Project> {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function updateProject(
  projectId: number,
  data: Partial<CreateProject>,
): Promise<Project> {
  const res = await fetch(`/api/projects/${projectId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function deleteProject(projectId: number): Promise<void> {
  await fetch(`/api/projects/${projectId}/`, {
    method: "DELETE",
  });
}
