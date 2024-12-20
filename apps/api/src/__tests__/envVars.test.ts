import { describe, it, expect, beforeAll } from "bun:test";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

import envVars from "../routes/envVars";
import { CreateEnvVariable } from "@envyper/zod";
import { testClient } from "hono/testing";

const app = new Hono().route("/variables", envVars);
const prisma = new PrismaClient();

describe("Environment Variable Endpoints", () => {
  let testProjectId: number;

  const testData: Omit<CreateEnvVariable, "projectId"> = {
    key: "DUMMY_TEST_KEY",
    value: "DUMMY_TEST_VALUE",
    envType: "DEV",
  };

  beforeAll(async () => {
    const testProject = await prisma.envVariable.create({
      data: {
        key: "TEST_KEY",
        value: "TEST_VALUE",
        envType: "DEV",
        projectId: 1,
      },
    });

    testProjectId = testProject.id;
  });

  it("should create a new environment variable", async () => {
    const res = await testClient(app).variables.$post({ json: testData });

    const record = await prisma.envVariable.findFirst({
      where: { key: testData.key },
    });

    expect(record).toMatchObject(testData);
    expect(res.status).toBe(201);
  });

  it("should get all environment variables under the specific project", async () => {
    const res = await testClient(app).variables.$get();
    const variables = await res.json();

    if ("data" in variables) {
      expect(variables.data?.length).toBe(1);
      expect(res.status).toBe(200);
    } else {
      expect(res.status).toBe(500);
    }
  });
});
