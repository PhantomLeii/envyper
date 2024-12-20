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

  const invalidTestData: CreateProject = {
    name: "Test project",
    description: "Test description",
    invalidField: "Invalid field",
  };

  let projectId: bigint;

  it("should create a new project", async () => {
    const res = await testClient(app).projects.$post(testData);

    const { data } = await res.json<{ data: Project[] }>();

    const record = await prisma.project.findUnique({
      where: { id: data[0].id },
    });

    expect(record).toMatchObject(testData);
    expect(res.status).toBe(201);
    projectId = data[0].id;
  });

  it("should return a single project", async () => {
    const res = await testClient(app).project.$get(`/${projectId}`);
    const { data } = await res.json<{ data: Project }>();

    expect(data.id).toBe(projectId);
    expect(res.status).toBe(200);
  });

  it("should update a project", async () => {
    const res = await testClient(app).project.$patch(`/${projectId}`, {
      name: "Updated project",
    });

    const { data } = await res.json<{ data: Project }>();

    const record = await prisma.project.findUnique({
      where: { id: projectId },
    });

    expect(record.name).toBe(data.name);
    expect(res.status).toBe(200);
  });

  it("should delete a project", async () => {
    const res = await testClient(app).project.$delete(`/${projectId}`);

    const record = await prisma.project.findUnique({
      where: { id: projectId },
    });

    expect(record).toBeNull();
    expect(res.status).toBe(200);
  });
});
