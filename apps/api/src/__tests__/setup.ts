import { afterAll } from "bun:test";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Running migrations:", Bun.env.DATABASE_URL);
  runMigration();
  await createTestUser("test-user");
};

afterAll(async () => {
  await prisma.$disconnect();
});

const runMigration = () => {
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

  console.log(`User: ${userId} created successfully`);
};

await main();
