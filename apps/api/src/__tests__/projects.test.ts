import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Projects Endpoints", async () => {
  const data = {
    name: "Test Project",
    description: "Test project description",
  };

  let projectId: number;

  beforeAll(async () => {
    await prisma.project.deleteMany({}); // Clean up before tests
  });

  afterAll(async () => {
    await prisma.project.deleteMany({}); // Clean up after tests
    await prisma.$disconnect();
  });

  it("should create a new project", async () => {
    const response = await fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe("Creates a new project");
    projectId = result.data.id;
  });

  it("should get all projects", async () => {
    const response = await fetch("http://localhost:3000/projects");
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe("Returns all users projects");
    expect(Array.isArray(result.data)).toBe(true);
  });

  it("should get a single project by id", async () => {
    const response = await fetch(`http://localhost:3000/projects/${projectId}`);
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe(
      `Returns a single project with ID: ${projectId}`,
    );
  });

  it("should update a project", async () => {
    const updateData = {
      name: "Updated Project Name",
    };
    const response = await fetch(
      `http://localhost:3000/projects/${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      },
    );
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe(`Updates a project with ID: ${projectId}`);
  });

  it("should delete a project", async () => {
    const response = await fetch(
      `http://localhost:3000/projects/${projectId}`,
      {
        method: "DELETE",
      },
    );
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe(`Deletes a project with ID: ${projectId}`);
  });

  it("should return 404 for non-existent project", async () => {
    const response = await fetch("http://localhost:3000/projects/999999");
    expect(response.status).toBe(404);
  });
});
