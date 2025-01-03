import { auth } from "@clerk/nextjs/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchProjects = async () => {
  const { getToken } = await auth();

  try {
    const res = await fetch(`${apiUrl}/projects`, {
      headers: {
        Authorization: `Bearer ${(await getToken()) as string}`,
      },
    });

    const body = await res.json();
    return body;
  } catch (e) {
    console.log(e);
  }
};

export const fetchProjectById = async (projectId: string) => {
  const { getToken } = await auth();

  try {
    const res = await fetch(`${apiUrl}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${(await getToken()) as string}`,
      },
    });

    const body = await res.json();
    return body;
  } catch (e) {
    console.log(e);
  }
};
