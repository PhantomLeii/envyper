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

  let projectId: bigint;

  it("should create a new project", async () => {
    const res = await testClient(app).projects.$post(testData);
    const project = await res.json<Project[]>();
    expect(project).toMatchObject(testData);

    const record = await prisma.project.findUnique({
      where: { id: project.id },
    });

    expect(record).toMatchObject(testData);
    projectId = res.body.data.id;
  });

  it("should return a single project", async () => {
    const res = await testClient(app).project.$get(`/projects/${projectId}`);
    const project = await res.json<Project>();

    expect(project.id).toBe(projectId);
  });

  it("should update a project", async () => {
    const res = await testClient(app).project.$patch(`/projects/${projectId}`, {
      name: "Updated project",
    });
    const project = await res.json<Project>();

    expect(project.name).toBe("Updated project");

    const record = await prisma.project.findUnique({
      where: { id: projectId },
    });

    expect(record.name).toBe("Updated project");
  });

  it("should delete a project", async () => {
    const res = await testClient(app).project.$delete(`/projects/${projectId}`);
    expect(res.status).toBe(200);

    const record = await prisma.project.findUnique({
      where: { id: projectId },
    });

    expect(record).toBeNull();
  });
});
