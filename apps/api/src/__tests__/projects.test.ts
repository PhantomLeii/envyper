// @ts-nocheck
import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import { CreateProject, Project } from "@envyper/zod";
import { PrismaClient } from "@prisma/client";
import { testClient } from "hono/testing";
import { Hono } from "hono";

import projects from "../routes/projects";

const app = new Hono().route("/projects", projects);
const prisma = new PrismaClient();

describe("Projects Enpoints", () => {
  const testData: CreateProject = {
    name: "Test project",
    description: "Test description",
  };

  let projectId: number;
  let extraProject: Project;

  it("should create a new project", async () => {
    const res = await testClient(app).projects.$post({ json: testData });

    const record = await prisma.project.findFirst({
      where: { name: testData.name },
    });

    expect(record).toMatchObject(testData);
    expect(res.status).toBe(201);

    projectId = record?.id as number;

    // create extra test project
    extraProject = await prisma.project.create({
      data: {
        name: "Extra project",
        description: "Extra description",
        creatorId: 2,
      },
    });
  });

  it("should return all projects belonging to user", async () => {
    const res = await testClient(app).projects.$get();
    const { data } = await res.json();

    expect(data?.length).toBe(1);
    expect(res.status).toBe(200);
  });

  it("should return a single project", async () => {
    const res = await testClient(app).projects[":id"].$get({
      param: { id: String(projectId) },
    });
    const { data } = await res.json();

    expect(data).toMatchObject(testData);
    expect(res.status).toBe(200);
  });

  it("should update a project", async () => {
    const res = await testClient(app).projects[":id"].$patch({
      param: { id: projectId },
      json: { description: "Updated description" },
    });

    const record = await prisma.project.findFirst({
      where: { id: projectId },
    });

    expect(record?.description).toBe("Updated description");
    expect(res.status).toBe(200);
  });

  it("should delete a project", async () => {
    const res = await testClient(app).projects[":id{[0-9]+}"].$delete({
      param: { id: String(projectId) },
    });
  });
});
