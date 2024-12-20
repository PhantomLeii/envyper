import { beforeAll } from "bun:test";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(() => {
  console.log("Setting up test environment\n");
  runMigration();

  createTestUser();

  console.log("Test environment setup complete\n");
});

const runMigration = () => {
  console.log("Migrating database:", process.env.DATABASE_URL);

  execSync("npm run migrate -w @envyper/orm", {
    stdio: "inherit",
  });
};

const createTestUser = async () => {
  await prisma.user.create({
    data: {
      userId: "test-user",
    },
  });

  console.log("Test user created\n");
};
