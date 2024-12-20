import { beforeAll, afterAll } from "bun:test";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log("Setting up test environment\n");
  runMigration();

  await createTestUser("test-user");
  await createTestUser("test-user-2");

  console.log("Test environment setup complete\n");
});

afterAll(async () => {
  await prisma.$disconnect();
});

const runMigration = () => {
  console.log("Migrating database:", Bun.env.DATABASE_URL);

  execSync("npm run migrate:reset -w @envyper/orm", {
    stdio: "inherit",
  });
};

const createTestUser = async (userId: string) => {
  await prisma.user.create({
    data: {
      userId,
    },
  });

  console.log("Test user created\n");
};
