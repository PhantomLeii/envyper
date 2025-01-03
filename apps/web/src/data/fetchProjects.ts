import { auth } from "@clerk/nextjs/server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const fetchProjects = async () => {
  const { getToken } = await auth();

  const res = await fetch(`${apiUrl}/projects`, {
    headers: {
      Authorization: `Bearer ${(await getToken()) as string}`,
    },
  });

  const body = await res.json();

  return body;
};
